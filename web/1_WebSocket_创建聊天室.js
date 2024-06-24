const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// 用于管理聊天室的 Map
const chatRooms = new Map();

// 生成唯一聊天室ID的函数
function generateRoomId() {
    return 'room-' + Math.random().toString(36).substring(2, 9);
}

// 处理新连接
server.on('connection', (ws) => {
    console.log('New client connected');

    // 监听消息
    ws.on('message', (message) => {
        const msg = JSON.parse(message);

        if (msg.type === 'create') {
            // 创建新的聊天室
            const roomId = generateRoomId();
            chatRooms.set(roomId, [ws]);
            ws.roomId = roomId;
            ws.send(JSON.stringify({ type: 'created', roomId }));
            console.log(`Created room ${roomId}`);
        } else if (msg.type === 'join') {
            // 加入已有的聊天室
            const roomId = msg.roomId;
            if (chatRooms.has(roomId)) {
                const room = chatRooms.get(roomId);
                if (room.length < 3) {
                    room.push(ws);
                    ws.roomId = roomId;
                    ws.send(JSON.stringify({ type: 'joined', roomId }));
                    console.log(`Client joined room ${roomId}`);
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Room is full' }));
                }
            } else {
                ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
            }
        } else if (msg.type === 'message') {
            // 发送消息到聊天室
            const roomId = ws.roomId;
            if (roomId && chatRooms.has(roomId)) {
                const room = chatRooms.get(roomId);
                room.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'message', message: msg.message }));
                    }
                });
                console.log(`Message sent to room ${roomId}`);
            }
        }
    });

    // 处理断开连接
    ws.on('close', () => {
        const roomId = ws.roomId;
        if (roomId && chatRooms.has(roomId)) {
            const room = chatRooms.get(roomId);
            const index = room.indexOf(ws);
            if (index !== -1) {
                room.splice(index, 1);
                if (room.length === 0) {
                    chatRooms.delete(roomId);
                    console.log(`Deleted room ${roomId}`);
                }
            }
        }
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');