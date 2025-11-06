// 加载并显示m3u8链接
function loadLinks() {
  chrome.runtime.sendMessage({ type: 'GET_M3U8_LINKS' }, (response) => {
    const links = response.links || [];
    const emptyState = document.getElementById('emptyState');
    const linksList = document.getElementById('linksList');
    
    if (links.length === 0) {
      emptyState.style.display = 'block';
      linksList.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      linksList.style.display = 'block';
      
      // 清空现有列表
      linksList.innerHTML = '';
      
      // 为每个链接创建一个卡片
      links.forEach((link, index) => {
        const linkItem = createLinkItem(link, index + 1);
        linksList.appendChild(linkItem);
      });
    }
  });
}

// 创建链接项元素
function createLinkItem(url, index) {
  const item = document.createElement('div');
  item.className = 'link-item';
  
  const header = document.createElement('div');
  header.className = 'link-header';
  
  const title = document.createElement('div');
  title.className = 'link-title';
  title.textContent = `资源 ${index}`;
  
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = '📋 复制';
  copyBtn.onclick = () => copyToClipboard(url, copyBtn);
  
  header.appendChild(title);
  header.appendChild(copyBtn);
  
  const urlText = document.createElement('div');
  urlText.className = 'link-url';
  urlText.textContent = url;
  urlText.title = url;
  
  item.appendChild(header);
  item.appendChild(urlText);
  
  return item;
}

// 复制链接到剪贴板
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    // 显示复制成功提示
    const originalText = button.textContent;
    button.textContent = '✅ 已复制';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    alert('复制失败，请重试');
  });
}

// 清除所有链接
function clearLinks() {
  if (confirm('确定要清除所有检测到的链接吗？')) {
    chrome.runtime.sendMessage({ type: 'CLEAR_M3U8_LINKS' }, () => {
      loadLinks();
    });
  }
}

// 打开设置页面
function openSettings() {
  chrome.runtime.openOptionsPage();
}

// 刷新链接列表
function refreshLinks() {
  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn.classList.add('rotating');
  
  // 重新扫描页面
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'RESCAN' }, () => {
        setTimeout(() => {
          loadLinks();
          refreshBtn.classList.remove('rotating');
        }, 500);
      });
    }
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadLinks();
  
  // 绑定按钮事件
  document.getElementById('clearBtn').addEventListener('click', clearLinks);
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('refreshBtn').addEventListener('click', refreshLinks);
});
