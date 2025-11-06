// 扫描页面中的所有元素，查找m3u8链接
function scanForM3U8Links() {
  const m3u8Urls = new Set();
  
  // 检查设置，判断是否启用自动检测
  chrome.storage.sync.get(['autoDetect'], (result) => {
    if (result.autoDetect === false) {
      return; // 如果禁用了自动检测，直接返回
    }
    
    // 1. 扫描所有的<a>标签
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.href;
      if (href.includes('.m3u8')) {
        m3u8Urls.add(href);
      }
    });
    
    // 2. 扫描所有的<video>和<source>标签
    const videos = document.querySelectorAll('video, source');
    videos.forEach(video => {
      const src = video.src || video.getAttribute('src');
      if (src && src.includes('.m3u8')) {
        m3u8Urls.add(src);
      }
    });
    
    // 3. 扫描页面中的所有文本节点，查找可能的m3u8 URL
    const bodyText = document.body.innerText;
    const urlPattern = /(https?:\/\/[^\s]+\.m3u8[^\s]*)/gi;
    const matches = bodyText.match(urlPattern);
    if (matches) {
      matches.forEach(url => m3u8Urls.add(url));
    }
    
    // 4. 扫描所有script标签内容
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      const content = script.textContent;
      const scriptMatches = content.match(urlPattern);
      if (scriptMatches) {
        scriptMatches.forEach(url => m3u8Urls.add(url));
      }
    });
    
    // 5. 扫描所有data属性
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      Array.from(element.attributes).forEach(attr => {
        if (attr.value && attr.value.includes('.m3u8')) {
          const attrMatches = attr.value.match(urlPattern);
          if (attrMatches) {
            attrMatches.forEach(url => m3u8Urls.add(url));
          }
        }
      });
    });
    
    // 如果找到m3u8链接，发送到background script
    if (m3u8Urls.size > 0) {
      const urls = Array.from(m3u8Urls);
      chrome.runtime.sendMessage({
        type: 'M3U8_FOUND',
        urls: urls
      });
      console.log('发现m3u8链接:', urls);
    }
  });
}

// 监听DOM变化，动态检测新添加的m3u8链接
const observer = new MutationObserver((mutations) => {
  // 使用防抖，避免频繁扫描
  clearTimeout(observer.timeoutId);
  observer.timeoutId = setTimeout(() => {
    scanForM3U8Links();
  }, 1000);
});

// 页面加载完成后开始扫描
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    scanForM3U8Links();
    // 开始监听DOM变化
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href', 'data-src']
    });
  });
} else {
  scanForM3U8Links();
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'href', 'data-src']
  });
}

console.log('M3U8检测内容脚本已加载');
