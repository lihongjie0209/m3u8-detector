// 加载设置
function loadSettings() {
  chrome.storage.sync.get(['autoDetect', 'showNotification'], (result) => {
    // 默认启用自动检测
    document.getElementById('autoDetect').checked = result.autoDetect !== false;
    document.getElementById('showNotification').checked = result.showNotification === true;
  });
}

// 保存设置
function saveSettings() {
  const autoDetect = document.getElementById('autoDetect').checked;
  const showNotification = document.getElementById('showNotification').checked;
  
  chrome.storage.sync.set({
    autoDetect: autoDetect,
    showNotification: showNotification
  }, () => {
    // 显示保存成功提示
    const saveStatus = document.getElementById('saveStatus');
    saveStatus.textContent = '✅ 设置已保存';
    saveStatus.className = 'save-status success show';
    
    setTimeout(() => {
      saveStatus.classList.remove('show');
    }, 2000);
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  // 监听设置变化，自动保存
  document.getElementById('autoDetect').addEventListener('change', saveSettings);
  document.getElementById('showNotification').addEventListener('change', saveSettings);
});
