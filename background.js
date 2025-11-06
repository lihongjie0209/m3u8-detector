// 存储检测到的m3u8链接，按tabId组织
let m3u8Links = {};

// 监听网络请求，检测m3u8资源
chrome.webRequest.onCompleted.addListener(
  (details) => {
    const url = details.url;
    
    // 检测URL中是否包含.m3u8
    if (url.includes('.m3u8')) {
      const tabId = details.tabId;
      
      // 如果tabId有效（不是-1）
      if (tabId >= 0) {
        // 初始化该tab的链接数组
        if (!m3u8Links[tabId]) {
          m3u8Links[tabId] = [];
        }
        
        // 避免重复添加
        if (!m3u8Links[tabId].includes(url)) {
          m3u8Links[tabId].push(url);
          
          // 更新badge显示
          updateBadge(tabId);
          
          console.log('检测到m3u8链接:', url);
        }
      }
    }
  },
  { urls: ["<all_urls>"] }
);

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'M3U8_FOUND') {
    const tabId = sender.tab.id;
    const urls = request.urls;
    
    if (!m3u8Links[tabId]) {
      m3u8Links[tabId] = [];
    }
    
    // 添加新发现的链接（去重）
    urls.forEach(url => {
      if (!m3u8Links[tabId].includes(url)) {
        m3u8Links[tabId].push(url);
      }
    });
    
    updateBadge(tabId);
    sendResponse({ success: true });
  } else if (request.type === 'GET_M3U8_LINKS') {
    // 返回当前tab的m3u8链接
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        sendResponse({ links: m3u8Links[tabId] || [] });
      } else {
        sendResponse({ links: [] });
      }
    });
    return true; // 保持消息通道开放
  } else if (request.type === 'CLEAR_M3U8_LINKS') {
    // 清除当前tab的链接
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        m3u8Links[tabId] = [];
        updateBadge(tabId);
        sendResponse({ success: true });
      }
    });
    return true;
  }
});

// 更新扩展图标的badge
function updateBadge(tabId) {
  const count = m3u8Links[tabId] ? m3u8Links[tabId].length : 0;
  
  if (count > 0) {
    chrome.action.setBadgeText({
      text: count.toString(),
      tabId: tabId
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#4CAF50',
      tabId: tabId
    });
  } else {
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId
    });
  }
}

// 监听tab关闭事件，清理存储的数据
chrome.tabs.onRemoved.addListener((tabId) => {
  delete m3u8Links[tabId];
});

// 监听tab更新事件，在导航到新页面时清理数据
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    m3u8Links[tabId] = [];
    updateBadge(tabId);
  }
});

console.log('M3U8资源探测器已启动');
