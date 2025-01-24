document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    let comments = JSON.parse(localStorage.getItem('comments') || '[]');

    // 渲染已有的留言和评论
    function renderComments() {
        commentsList.innerHTML = comments.map(comment => `
            <div class="p-4 bg-gray-50 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold text-gray-800">${comment.name}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500">${comment.date}</span>
                        <button class="delete-comment p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200" data-id="${comment.id}" title="删除留言">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">${comment.message}</p>
                
                <!-- 评论区 -->
                <div class="mt-4 space-y-2">
                    ${comment.replies ? comment.replies.map(reply => `
                        <div class="ml-4 p-2 bg-white rounded">
                            <div class="flex justify-between items-center">
                                <span class="font-medium text-sm">${reply.name}</span>
                                <span class="text-xs text-gray-500">${reply.date}</span>
                            </div>
                            <p class="text-sm text-gray-600 mt-1">${reply.message}</p>
                        </div>
                    `).join('') : ''}
                </div>
                
                <!-- 回复表单 -->
                <div class="mt-4">
                    <form class="reply-form flex items-center space-x-2">
                        <input type="text" class="reply-name flex-shrink-0 w-24 px-2 py-1 border rounded" placeholder="你的名字" required>
                        <input type="text" class="reply-message flex-grow px-2 py-1 border rounded" placeholder="添加评论..." required>
                        <button type="submit" class="reply-submit px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" data-id="${comment.id}">回复</button>
                    </form>
                </div>
            </div>
        `).join('');

        // 添加删除事件监听
        document.querySelectorAll('.delete-comment').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                deleteComment(id);
            });
        });

        // 添加回复表单事件监听
        document.querySelectorAll('.reply-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const commentId = this.querySelector('.reply-submit').dataset.id;
                const name = this.querySelector('.reply-name').value;
                const message = this.querySelector('.reply-message').value;
                addReply(commentId, name, message);
                this.reset();
            });
        });
    }

    // 删除留言
    function deleteComment(id) {
        comments = comments.filter(comment => comment.id !== id);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    }

    // 添加回复
    function addReply(commentId, name, message) {
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            if (!comment.replies) comment.replies = [];
            comment.replies.push({
                name,
                message,
                date: new Date().toLocaleString('zh-CN')
            });
            localStorage.setItem('comments', JSON.stringify(comments));
            renderComments();
        }
    }

    // 初始渲染
    renderComments();

    // 处理新留言表单提交
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const date = new Date().toLocaleString('zh-CN');

        // 添加新留言
        comments.unshift({
            id: Date.now().toString(), // 添加唯一ID
            name,
            message,
            date,
            replies: []
        });

        // 保存到localStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // 重新渲染留言列表
        renderComments();

        // 重置表单
        commentForm.reset();
    });
});