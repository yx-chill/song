const wz = (wrap) => {
  const dir = document.getElementById(wrap);
  const hoverDir = (e) => {
    const w = dir.offsetWidth;
    const h = dir.offsetHeight;
    const x = (e.clientX - wrap.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    const y = (e.clientY - wrap.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    // 上(0) 右(1) 下(2) 左(3)
    const direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    const dirName = ['上方', '右侧', '下方', '左侧'];
    if (e.type === 'mouseover' || e.type === 'mouseenter') {
      dir.innerHTML = `${dirName[direction]}进入`;
    } else {
      dir.innerHTML = `${dirName[direction]}离开`;
    }
  };
  if (window.addEventListener) {
    wrap.addEventListener('mouseover', hoverDir, false);
    wrap.addEventListener('mouseout', hoverDir, false);
  } else if (window.attachEvent) {
    wrap.attachEvent('onmouseenter', hoverDir);
    wrap.attachEvent('onmouseleave', hoverDir);
  }
};
wz('box');
export default {
  wz,
};
