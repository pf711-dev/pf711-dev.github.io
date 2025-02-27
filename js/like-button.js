// 点赞处理函数
function handleLike() {
  const button = document.getElementById('likeButton');
  const countSpan = document.getElementById('likeCount');
  const statsDiv = document.getElementById('likeStats');
  const postPath = window.location.pathname;
  
  // 获取当前文章的总点赞数
  let totalLikes = parseInt(localStorage.getItem(`totalLikes_${postPath}`) || '0');
  const isLiked = !button.classList.contains('liked');
  
  if (isLiked) {
    // 添加点赞
    totalLikes++;
    button.classList.add('liked');
    countSpan.textContent = '已喜欢';
    statsDiv.textContent = `${totalLikes} 人已喜欢`;
    statsDiv.style.display = 'block';
    localStorage.setItem(`like_${postPath}`, 'true');
    localStorage.setItem(`totalLikes_${postPath}`, totalLikes.toString());
  } else {
    // 取消点赞
    if (totalLikes > 0) totalLikes--;
    button.classList.remove('liked');
    countSpan.textContent = '喜欢';
    if (totalLikes > 0) {
      statsDiv.textContent = `${totalLikes} 人已喜欢`;
      statsDiv.style.display = 'block';
    } else {
      statsDiv.style.display = 'none';
    }
    localStorage.removeItem(`like_${postPath}`);
    localStorage.setItem(`totalLikes_${postPath}`, totalLikes.toString());
  }
}

// 页面加载时检查点赞状态
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('likeButton');
  const countSpan = document.getElementById('likeCount');
  const statsDiv = document.getElementById('likeStats');
  const postPath = window.location.pathname;
  
  // 获取点赞状态和总数
  const isLiked = localStorage.getItem(`like_${postPath}`) === 'true';
  const totalLikes = parseInt(localStorage.getItem(`totalLikes_${postPath}`) || '0');
  
  if (isLiked) {
    button.classList.add('liked');
    countSpan.textContent = '已喜欢';
  } else {
    button.classList.remove('liked');
    countSpan.textContent = '喜欢';
  }
  
  if (totalLikes > 0) {
    statsDiv.textContent = `${totalLikes} 人已喜欢`;
    statsDiv.style.display = 'block';
  } else {
    statsDiv.style.display = 'none';
  }
});