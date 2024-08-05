$encoding = [System.Text.Encoding]::UTF8
[console]::OutputEncoding = $encoding

$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $repoDir

$taskName = "$($env:COMPUTERNAME)_auto_push"
$scheduledTaskName = "$taskName_tomorrow"

# Create scheduled task
$scheduledTaskAction = New-ScheduledTaskAction -Execute "Powershell.exe" -Argument "-File `"$($MyInvocation.MyCommand.Path)`""
$scheduledTaskTrigger = New-ScheduledTaskTrigger -At 9:30PM -Daily
Register-ScheduledTask -Action $scheduledTaskAction -Trigger $scheduledTaskTrigger -TaskName $taskName -Force

# Check if there are changes to commit
$changes = git status --porcelain
if ($changes) {
    git add .
    $time = Get-Date -Format 'HH:mm'
    $commitMsg = "自动提交: $(Get-Date -Format 'MM/dd/yyyy') at $time"
    git commit -m $commitMsg
    git push

    # Delete tomorrow's scheduled task if it exists
    Unregister-ScheduledTask -TaskName $scheduledTaskName -Confirm:$false -ErrorAction SilentlyContinue
}

# Check if branch is ahead and handle WiFi connection
$branchStatus = git status
if ($branchStatus -like 'Your branch is ahead*') {
    $ssid = netsh wlan show interfaces | Select-String -Pattern 'SSID' | ForEach-Object { $_.Line.Split(':')[4].Trim() }
    if ($ssid) {
        Write-Host "当前连接的 WiFi 名称为: $ssid"
        Write-Host "自动提交失败,每5分钟自动重试一次。"
        Start-Sleep -Seconds 300
        Write-Host "开始再次推送更改,直到成功。"
        & $MyInvocation.MyCommand.Path
    } else {
        Write-Host "当前未连接任何 WiFi"
        Write-Host "已创建计划任务,等待明天9:30自动重试。"
        
        # Create scheduled task for tomorrow
        $scheduledTaskAction = New-ScheduledTaskAction -Execute "Powershell.exe" -Argument "-File `"$($MyInvocation.MyCommand.Path)`""
        $scheduledTaskTrigger = New-ScheduledTaskTrigger -At 9:30AM -Daily
        Register-ScheduledTask -Action $scheduledTaskAction -Trigger $scheduledTaskTrigger -TaskName $scheduledTaskName -Force
    }
}