let _deg = Math.PI;

function CircleAnimate(canvas, arr, lastArr, options) {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    options = options || {};
    let opts = {
        r: options.r || (SCREEN_WIDTH > SCREEN_HEIGHT) ? SCREEN_HEIGHT / 4 : SCREEN_WIDTH / 4, // 圆半径
        n: options.n || 96, // 点数（必须为偶数）
        w: options.w || 4, // 线宽
        colors: options.colors || [{
            stop: '1',
            color: 'rgba(255,255,255,.8)'
        }], // 颜色及其过渡位置
        blurColor: options.blurColor || '#ffffff', // 模糊颜色
        blurWidth: options.blurWidth || 20,
        rotate: options.rotate || false,
        tempArr: lastArr || []
    };
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let arr1 = [];
    let arr2 = [];
    let x, y, value;
    let DEG = opts.n / 2;
    let step = Math.round(arr.length / opts.n / 2);
    let centerX = SCREEN_WIDTH / 2;
    let centerY = SCREEN_HEIGHT / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(_deg);
    ctx.translate(-centerX, -centerY);
    if (opts.rotate) {
        _deg += Math.PI / 1080;
    }
    for (let i = 0; i < opts.n / 2; i++) {
        value = arr[i * step] * arr[i * step] / 200;
        let n1 = value || 0;
        let n2;
        if (opts.tempArr[i]) {
            n2 = 0;
        } else {
            n2 = 0;
        }
        n1 = Math.max(n1, n2);
        n1 = Math.min(n1, 300);
        opts.tempArr[i] = n1;
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        arr1.push({
            'x': x,
            'y': y
        });
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        arr2.push({
            'x': x,
            'y': y
        });
    }
    for (let i = opts.n / 2, j = 0; i < opts.n; i++, j++) {
        value = arr[j * step] * arr[j * step] / 200;
        let n1 = value || 0;
        let n2;
        if (opts.tempArr[j]) {
            n2 = 0;
        } else {
            n2 = 0;
        }
        n1 = Math.max(n1, n2);
        n1 = Math.min(n1, 300);
        opts.tempArr[j] = n1;
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        arr1.push({
            'x': x,
            'y': y
        });
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        arr2.push({
            'x': x,
            'y': y
        });
    }
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    opts.colors.forEach((item) => {
        gradient.addColorStop(item.stop, item.color);
    });
    ctx.shadowBlur = opts.blurWidth;
    ctx.shadowColor = opts.blurColor;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(arr1[opts.n - 1].x, arr1[opts.n - 1].y);
    for (let i = 0; i < opts.n; i++) {
        ctx.lineTo(arr1[i].x, arr1[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(arr2[opts.n - 1].x, arr2[opts.n - 1].y);
    for (let i = 0; i < opts.n; i++) {
        ctx.lineTo(arr2[i].x, arr2[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < opts.n; i++) {
        ctx.moveTo(arr1[i].x, arr1[i].y);
        ctx.lineTo(arr2[i].x, arr2[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    return opts.tempArr;
}

export default CircleAnimate;