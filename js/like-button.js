// 点赞处理函数
function handleLike() {
  const button = document.getElementById('likeButton');
  const countSpan = document.getElementById('likeCount');
  const statsDiv = document.getElementById('likeStats');
  const postPath = window.location.pathname;
  
  // 切换点赞状态
  const isLiked = !button.classList.contains('liked');
  
  if (isLiked) {
    // 添加点赞
    button.classList.add('liked');
    countSpan.textContent = '已喜欢';
    statsDiv.textContent = '1 人已喜欢';
    statsDiv.style.display = 'block';
    localStorage.setItem(`like_${postPath}`, 'true');
  } else {
    // 取消点赞
    button.classList.remove('liked');
    countSpan.textContent = '喜欢';
    statsDiv.style.display = 'none';
    localStorage.removeItem(`like_${postPath}`);
  }
}

// 页面加载时检查点赞状态
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('likeButton');
  const countSpan = document.getElementById('likeCount');
  const statsDiv = document.getElementById('likeStats');
  const postPath = window.location.pathname;
  
  // 检查是否已点赞
  const isLiked = localStorage.getItem(`like_${postPath}`) === 'true';
  
  if (isLiked) {
    button.classList.add('liked');
    countSpan.textContent = '已喜欢';
    statsDiv.textContent = '1 人已喜欢';
    statsDiv.style.display = 'block';
  } else {
    button.classList.remove('liked');
    countSpan.textContent = '喜欢';
    statsDiv.style.display = 'none';
  }
});