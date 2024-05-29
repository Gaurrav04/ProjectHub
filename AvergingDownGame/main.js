(
    
    function () {
    const $=s=>{
        return document.querySelector(s);
    }
    const $$=s=>{
        return document.querySelectorAll(s);
    }
    $('.rules-btn').onclick=()=>showRules();
    $('.btn.back').onclick=()=>hideRule();

    window.showRules=()=>{
        $('.rules').classList.add('active');
        setTimeout(()=>$('.rules').classList.add('opacity'),50);
    }
    window.hideRule=()=>{
        setTimeout(()=>$('.rules').classList.remove('active'),500);
        $('.rules').classList.remove('opacity');
    }

    var g,l,h=["red","blue","yellow","green","purple","lightgreen","deeppink","orange","brown","pink"],
    w=[],
    ow=[],
    s,cln,sl=[],
    it=false,
    tp="transparent",
    vw=false,
    m=0;
    var P={
        0:[[110,25],[190,25],[268,25],[148,165],[232,165]],
        1:[[110,25],[190,25],[268,25],[110,165],[190,165],[268,165]],
        2:[[55,25],[140,25],[225,25],[310,25],[95,165],[180,165],[265,165]],
        3:[[55,25],[140,25],[225,25],[310,25],[55,165],[140,165],[225,165],[310,165]],
        7:[[25,25],[90,25],[155,25],[220,25],[285,25],[350,25],[25,165],[90,165],[155,165],[220,165],[285,165],[350,165]],
    }


    g=$(".game");
    l=$(".level"),
    lb=$$('.lvl');
    for(let i = 0; i < lb.length; i++) lb[i].onclick=()=>(i == 4) ? rl(7) : rl(i);

    const rl=lv => {
        m=0;
        s=lv;
        vw=false;
        $('.level').classList.add('active');
        setTimeout(() => $('.level').classList.add('opacity'), 50);
        l.innerHTML = "";
        w = [];
        let tempColors = [];
        let count = 0;
        for (let i = 0; i < lv + 3; i++) {
            for (let j = 0; j < 4; j++) tempColors.push(h[i]);
        }

        tempColors = sh(tempColors);
        for (let i = 0; i < lv + 3; i++) {
            w[i] = [];
            for (let j = 0; j < 4; j++) {
                w[i].push(tempColors[count]);
                count++;
            }
        }

        w.push([tp,tp,tp,tp], [tp,tp,tp,tp]);
        ow = w.map((a) => [...a]);
        aI();
    }

    window.sh = a => {
        let shuffledArray = [],
        length = a.length;

        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * a.length);
            shuffledArray.push(a[randomIndex]);
            a.splice(randomIndex, 1);
        }

        return shuffledArray;
    }
    window.aI=(arr=w)=> {
        if (!vw) {
            let index = 0;
            let item = '';
            let heading = ["Easy", "Medium", "Hard", "Difficult", "", "", "", "Veryhard"][s];
            l.innerHTML = `<div class="game-option">
                <div class="btn restart">Return</div>
                <div class="moves"><span class="count">${m}</span></div>
                <div class="btn home">Exit</div>
            </div>
            <div class="lvl-name">${heading}</div>
            <div class="tube-items"></div>`;
            for (let i of P[s]) {
                item += `<div class="tube" style="top:${i[1]}px;left:${i[0]}px;transform:rotate(0deg)">
                    <div class="color" style="background:${arr[index][0]};top:100px"></div>
                    <div class="color" style="background:${arr[index][1]};top:70px"></div>
                    <div class="color" style="background:${arr[index][2]};top:40px"></div>
                    <div class="color" style="background:${arr[index][3]};top:10px"></div>
                </div>`;
                index++;
            }
            $('.tube-items').innerHTML = item; r();
            const tubes = $$('.tube');
            for (let i = 0; i < tubes.length; i++) tubes[i].onclick = () => ct(i);
        }
    }

    window.r=()=>{
        $('.restart').onclick = () => rg();
        $('.home').onclick = () => {
            setTimeout(() => $('.level').classList.remove('active'), 500);
            $('.level').classList.remove('opacity');
        }
    }

    window.rg=()=> {
        m=0;
        w=ow.map((a) => [...a]);
        vw=false;
        aI(ow);
        rl(s);
    }

    window.ct=i=> {
        if (!it) {
            if (sl.length == 0) {
                sl.push(i);
                $$(".tube")[i].style.transform = "scale(1.08)";
            } else {
                sl.push(i);
                let el = $$(".tube")[sl[0]];
                el.style.transform = "scale(1) rotate(0deg)";
                if (sl[0] != sl[1]) {
                    m++;
                    $(".count").textContent = m;
                    tw(...sl);
                }
                sl=[];
            }
        }
    }

    window.tw= (src,dst) => {
        if (!w[dst].includes(tp) || w[src] == [tp, tp, tp, tp]) {
            m -= 1;
            $(".count").textContent = m;
            return;
        }
        let srcPipe,dstPipe,tempTransfer=false,
        tempReceive=false,
        count=0,
        transferCount=0;
        for (let i = 0; i < 4; i++) {
            if (((w[src][i] != tp && w[src][i + 1] == tp) || i === 3) && !tempTransfer) {
                tempTransfer = true;
                srcPipe = [w[src][i], i];
                if (w[src].map(function(x) {
                    if (x == tp || x == srcPipe[0]) { return 1; } else { return 0; }
                  }).reduce((x, y) => x + y) === 4) {
                  srcPipe.push(i + 1)
                }  else {
                    for (let j = 1; j < 4; j++) {
                        if (i - j >= 0 && w[src][i - j] != srcPipe[0]) {
                            srcPipe.push(j);
                            break;
                        }
                    }
                }
            }

            if (((w[dst][i] != tp && w[dst][i + 1] == tp) || w[dst][0] == tp) && !tempReceive) {
                tempReceive = true;
                dstPipe = [w[dst][i], i, w[dst].map((x) => x = (x == tp) ? 1 : 0).reduce((x, y) => x + y)];
            }
        }

        if (dstPipe[0] != tp && srcPipe[0] != dstPipe[0]) {
            m -= 1;
            $(".count").textContent = m;
            return;
        }
        for (let i = 3; i >= 0; i--) {
            if ((w[src][i] == srcPipe[0] || w[src][i] == tp) && count < dstPipe[2]) {
                if (w[src][i] == srcPipe[0]) count++;
                w[src][i] = tp;
            } else break;
        }

        transferCount=count;
        setTimeout(()=>wd({ pipe: srcPipe, source: src, count: transferCount }), 1010);
        setTimeout(() => wi({ pipe: srcPipe, dstPipe: dstPipe, destination: dst, count: transferCount }), 1010);
        for (let i = 0; i < 4; i++) {
            if (w[dst][i] == tp && count > 0) {
              count--;
              w[dst][i] = srcPipe[0];
            }
        }
        setTimeout(() => aI(), 3020);
        setTimeout(() => ta({ source: src, destination: dst }), 10);
        setTimeout(victoryCheck, 3000);
    }

    window.wd=e=> {
        e.pipe[1] = 3 - e.pipe[1];
        $$(".tube")[e.source].innerHTML += `<div class="tr-bg" style="top:calc(10px + ${e.pipe[1]*30}px - 1px)"></div>`;
        setTimeout(() => { $(".tr-bg").style.height = e.count * 30 + 1 + "px"; }, 50);
        setTimeout(() => {
            $$(".tube")[e.source].innerHTML = `
                <div class="color" style="background:${w[e.source][0]};top:100px"></div>
                <div class="color" style="background:${w[e.source][1]};top:70px"></div>
                <div class="color" style="background:${w[e.source][2]};top:40px"></div>
                <div class="color" style="background:${w[e.source][3]};top:10px"></div>`;
        }, 1050);
    }

    window.wi=e=> {
        e.dstPipe[1] = 4 - e.dstPipe[1];
        e.dstPipe[1] -= (e.dstPipe[0] != tp ? 1 : 0);
        $$(".tube")[e.destination].innerHTML += `<div class="colorful" style="background:${e.pipe[0]};top:calc(10px + ${e.dstPipe[1]*30}px)"></div>`;
        setTimeout(function() {
          $(".colorful").style.height = e.count * 30 + 1 + "px";
          $(".colorful").style.top = `calc(10px + ${e.dstPipe[1]*30}px - ${e.count*30}px)`;
        }, 50);
    }

    window.ta=e=> {
        let el = $$(".tube")[e.source];
        it = true;
        el.style.zIndex = "10";
        el.style.top = `${P[s][e.destination][1] - 95}px`;
        el.style.left = `${P[s][e.destination][0] - 65}px`;
        el.style.transform = "rotate(75deg)";
        setTimeout(() => el.style.transform = "rotate(90deg)", 1000);
        setTimeout(function() {
            el.style.left = `${P[s][e.source][0]}px`;
            el.style.top = `${P[s][e.source][1]}px`;
            el.style.transform = "rotate(0deg)";
        }, 2000);
        setTimeout(function() {
            el.style.zIndex = "0";
            it = false;
        }, 3000);
    }

    const victoryCheck=()=> {
        for (let i of w) {
          if (i[0] != i[1] || i[1] != i[2] || i[2] != i[3]) return;
        }
        vw = true;
        l.innerHTML = `<div class="game-option">
            <div class="btn restart">Return</div>
            <div class="btn home">Existing</div>
        </div>
        <div class="tube-items"><div class="won">Congratulations<br>You win</div></div>`;
        r();
    }
    
})();
