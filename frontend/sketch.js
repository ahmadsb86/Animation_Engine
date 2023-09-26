//Global variables

cursor = 0; //this variable is used during the setup phase. It keeps track of the frame on which any new animation should be put on and incremented by async animation.
width = 0;
height = 0;
config = {
  WEBGL: true,
  videoLength: 360,
};
shapes$ = []; //The main man
DataUrls$ = []; //array that stores all data urls of shapes that are converted to images (e.g. math) (updated @ construct-time)
ImageObjs$ = []; //array that stores p5 objs of corresponding data urls in DataUrls$ array  (mapping happens in p.setup after construct-time)
//Note: the '$' suffix is used for global variables that end user will most likely never access and helps avoid naming conflicts

var $ = () => {
  //Wrapping everything in a function so that variables stay local

  //Local Variables
  let capture = false;
  let captureStart = false;
  let frame = 0;
  let frameSliderEl = document.getElementById("frameSlider");
  let fpsDisplayEl = document.getElementById("FPS");

  const sketch = (p) => {
    p5.disableFriendlyErrors = false;

    p.preload = () => {
      // Load a font for rendering text
      font = p.loadFont("./oswald.ttf");
    };

    p.setup = function () {
      if (typeof preGo != "undefined") {
        preGo();
      }

      if (config.WEBGL) {
        p.createCanvas(1920, 1080, p.WEBGL2);
      } else {
        p.createCanvas(1920, 1080);
      }

      width = p.width;
      height = p.height;
      frameSliderEl.setAttribute("max", config.videoLength);

      if (typeof go != "undefined") {
        go();
      }

      testImg = p.loadImage(
        "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2221.394ex%22%20height%3D%225.291ex%22%20role%3D%22img%22%20focusable%3D%22false%22%20viewBox%3D%220%20-1642.5%209456%202338.5%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20aria-hidden%3D%22true%22%20style%3D%22vertical-align%3A%20-1.575ex%3B%22%3E%3Cdefs%3E%3Cpath%20id%3D%22MJX-1-TEX-I-1D465%22%20d%3D%22M52%20289Q59%20331%20106%20386T222%20442Q257%20442%20286%20424T329%20379Q371%20442%20430%20442Q467%20442%20494%20420T522%20361Q522%20332%20508%20314T481%20292T458%20288Q439%20288%20427%20299T415%20328Q415%20374%20465%20391Q454%20404%20425%20404Q412%20404%20406%20402Q368%20386%20350%20336Q290%20115%20290%2078Q290%2050%20306%2038T341%2026Q378%2026%20414%2059T463%20140Q466%20150%20469%20151T485%20153H489Q504%20153%20504%20145Q504%20144%20502%20134Q486%2077%20440%2033T333%20-11Q263%20-11%20227%2052Q186%20-10%20133%20-10H127Q78%20-10%2057%2016T35%2071Q35%20103%2054%20123T99%20143Q142%20143%20142%20101Q142%2081%20130%2066T107%2046T94%2041L91%2040Q91%2039%2097%2036T113%2029T132%2026Q168%2026%20194%2071Q203%2087%20217%20139T245%20247T261%20313Q266%20340%20266%20352Q266%20380%20251%20392T217%20404Q177%20404%20142%20372T93%20290Q91%20281%2088%20280T72%20278H58Q52%20284%2052%20289Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-3D%22%20d%3D%22M56%20347Q56%20360%2070%20367H707Q722%20359%20722%20347Q722%20336%20708%20328L390%20327H72Q56%20332%2056%20347ZM56%20153Q56%20168%2072%20173H708Q722%20163%20722%20153Q722%20140%20707%20133H70Q56%20140%2056%20153Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-2212%22%20d%3D%22M84%20237T84%20250T98%20270H679Q694%20262%20694%20250T679%20230H98Q84%20237%2084%20250Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-I-1D44F%22%20d%3D%22M73%20647Q73%20657%2077%20670T89%20683Q90%20683%20161%20688T234%20694Q246%20694%20246%20685T212%20542Q204%20508%20195%20472T180%20418L176%20399Q176%20396%20182%20402Q231%20442%20283%20442Q345%20442%20383%20396T422%20280Q422%20169%20343%2079T173%20-11Q123%20-11%2082%2027T40%20150V159Q40%20180%2048%20217T97%20414Q147%20611%20147%20623T109%20637Q104%20637%20101%20637H96Q86%20637%2083%20637T76%20640T73%20647ZM336%20325V331Q336%20405%20275%20405Q258%20405%20240%20397T207%20376T181%20352T163%20330L157%20322L136%20236Q114%20150%20114%20114Q114%2066%20138%2042Q154%2026%20178%2026Q211%2026%20245%2058Q270%2081%20285%20114T318%20219Q336%20291%20336%20325Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-B1%22%20d%3D%22M56%20320T56%20333T70%20353H369V502Q369%20651%20371%20655Q376%20666%20388%20666Q402%20666%20405%20654T409%20596V500V353H707Q722%20345%20722%20333Q722%20320%20707%20313H409V40H707Q722%2032%20722%2020T707%200H70Q56%207%2056%2020T70%2040H369V313H70Q56%20320%2056%20333Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-221A%22%20d%3D%22M95%20178Q89%20178%2081%20186T72%20200T103%20230T169%20280T207%20309Q209%20311%20212%20311H213Q219%20311%20227%20294T281%20177Q300%20134%20312%20108L397%20-77Q398%20-77%20501%20136T707%20565T814%20786Q820%20800%20834%20800Q841%20800%20846%20794T853%20782V776L620%20293L385%20-193Q381%20-200%20366%20-200Q357%20-200%20354%20-197Q352%20-195%20256%2015L160%20225L144%20214Q129%20202%20113%20190T95%20178Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-32%22%20d%3D%22M109%20429Q82%20429%2066%20447T50%20491Q50%20562%20103%20614T235%20666Q326%20666%20387%20610T449%20465Q449%20422%20429%20383T381%20315T301%20241Q265%20210%20201%20149L142%2093L218%2092Q375%2092%20385%2097Q392%2099%20409%20186V189H449V186Q448%20183%20436%2095T421%203V0H50V19V31Q50%2038%2056%2046T86%2081Q115%20113%20136%20137Q145%20147%20170%20174T204%20211T233%20244T261%20278T284%20308T305%20340T320%20369T333%20401T340%20431T343%20464Q343%20527%20309%20573T212%20619Q179%20619%20154%20602T119%20569T109%20550Q109%20549%20114%20549Q132%20549%20151%20535T170%20489Q170%20464%20154%20447T109%20429Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-34%22%20d%3D%22M462%200Q444%203%20333%203Q217%203%20199%200H190V46H221Q241%2046%20248%2046T265%2048T279%2053T286%2061Q287%2063%20287%20115V165H28V211L179%20442Q332%20674%20334%20675Q336%20677%20355%20677H373L379%20671V211H471V165H379V114Q379%2073%20379%2066T385%2054Q393%2047%20442%2046H471V0H462ZM293%20211V545L74%20212L183%20211H293Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-I-1D44E%22%20d%3D%22M33%20157Q33%20258%20109%20349T280%20441Q331%20441%20370%20392Q386%20422%20416%20422Q429%20422%20439%20414T449%20394Q449%20381%20412%20234T374%2068Q374%2043%20381%2035T402%2026Q411%2027%20422%2035Q443%2055%20463%20131Q469%20151%20473%20152Q475%20153%20483%20153H487Q506%20153%20506%20144Q506%20138%20501%20117T481%2063T449%2013Q436%200%20417%20-8Q409%20-10%20393%20-10Q359%20-10%20336%205T306%2036L300%2051Q299%2052%20296%2050Q294%2048%20292%2046Q233%20-10%20172%20-10Q117%20-10%2075%2030T33%20157ZM351%20328Q351%20334%20346%20350T323%20385T277%20405Q242%20405%20210%20374T160%20293Q131%20214%20119%20129Q119%20126%20119%20118T118%20106Q118%2061%20136%2044T179%2026Q217%2026%20254%2059T298%20110Q300%20114%20325%20217T351%20328Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-I-1D450%22%20d%3D%22M34%20159Q34%20268%20120%20355T306%20442Q362%20442%20394%20418T427%20355Q427%20326%20408%20306T360%20285Q341%20285%20330%20295T319%20325T330%20359T352%20380T366%20386H367Q367%20388%20361%20392T340%20400T306%20404Q276%20404%20249%20390Q228%20381%20206%20359Q162%20315%20142%20235T121%20119Q121%2073%20147%2050Q169%2026%20205%2026H209Q321%2026%20394%20111Q403%20121%20406%20121Q410%20121%20419%20112T429%2098T420%2083T391%2055T346%2025T282%200T202%20-11Q127%20-11%2081%2037T34%20159Z%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22MJX-1-TEX-N-2E%22%20d%3D%22M78%2060Q78%2084%2095%20102T138%20120Q162%20120%20180%20104T199%2061Q199%2036%20182%2018T139%200T96%2017T78%2060Z%22%3E%3C%2Fpath%3E%3C%2Fdefs%3E%3Cg%20stroke%3D%22currentColor%22%20fill%3D%22currentColor%22%20stroke-width%3D%220%22%20transform%3D%22scale(1%2C-1)%22%3E%3Cg%20data-mml-node%3D%22math%22%3E%3Cg%20data-mml-node%3D%22mi%22%3E%3Cuse%20data-c%3D%221D465%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-I-1D465%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mo%22%20transform%3D%22translate(849.8%2C0)%22%3E%3Cuse%20data-c%3D%223D%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-3D%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22TeXAtom%22%20data-mjx-texclass%3D%22ORD%22%20transform%3D%22translate(1905.6%2C0)%22%3E%3Cg%20data-mml-node%3D%22mfrac%22%3E%3Cg%20data-mml-node%3D%22mrow%22%20transform%3D%22translate(220%2C676)%22%3E%3Cg%20data-mml-node%3D%22mo%22%3E%3Cuse%20data-c%3D%222212%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-2212%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mi%22%20transform%3D%22translate(778%2C0)%22%3E%3Cuse%20data-c%3D%221D44F%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-I-1D44F%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mo%22%20transform%3D%22translate(1429.2%2C0)%22%3E%3Cuse%20data-c%3D%22B1%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-B1%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22msqrt%22%20transform%3D%22translate(2429.4%2C0)%22%3E%3Cg%20transform%3D%22translate(853%2C0)%22%3E%3Cg%20data-mml-node%3D%22msup%22%3E%3Cg%20data-mml-node%3D%22mi%22%3E%3Cuse%20data-c%3D%221D44F%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-I-1D44F%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mn%22%20transform%3D%22translate(462%2C289)%20scale(0.707)%22%3E%3Cuse%20data-c%3D%2232%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-32%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mo%22%20transform%3D%22translate(1087.8%2C0)%22%3E%3Cuse%20data-c%3D%222212%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-2212%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mn%22%20transform%3D%22translate(2088%2C0)%22%3E%3Cuse%20data-c%3D%2234%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-34%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mi%22%20transform%3D%22translate(2588%2C0)%22%3E%3Cuse%20data-c%3D%221D44E%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-I-1D44E%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mi%22%20transform%3D%22translate(3117%2C0)%22%3E%3Cuse%20data-c%3D%221D450%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-I-1D450%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mo%22%20transform%3D%22translate(0%2C106.5)%22%3E%3Cuse%20data-c%3D%22221A%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-221A%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Crect%20width%3D%223550%22%20height%3D%2260%22%20x%3D%22853%22%20y%3D%22846.5%22%3E%3C%2Frect%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mrow%22%20transform%3D%22translate(3121.7%2C-686)%22%3E%3Cg%20data-mml-node%3D%22mn%22%3E%3Cuse%20data-c%3D%2232%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-32%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mi%22%20transform%3D%22translate(500%2C0)%22%3E%3Cuse%20data-c%3D%221D44E%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-I-1D44E%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3C%2Fg%3E%3Crect%20width%3D%227032.4%22%20height%3D%2260%22%20x%3D%22120%22%20y%3D%22220%22%3E%3C%2Frect%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20data-mml-node%3D%22mo%22%20transform%3D%22translate(9178%2C0)%22%3E%3Cuse%20data-c%3D%222E%22%20xlink%3Ahref%3D%22%23MJX-1-TEX-N-2E%22%3E%3C%2Fuse%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
      );

      p.textFont(font);
      p.rectMode(p.CENTER);
      p.imageMode(p.CENTER);
      p.angleMode(p.DEGREES);
      p.textAlign(p.CENTER);
    };

    p.draw = function () {
      // p.translate(p.width/2,p.height/2)   //move origin to center of screen

      if (p.frameCount == 1) {
        //on the first Frame of the program (not of the player) do some setup stuff that must be done after setup()
        for (let dataUrl of DataUrls$) {
          console.log("dakshd jlkasdl;asjd lkjsalkd");
          ImageObjs$.push(p.loadImage(dataUrl));
        }
        console.log(ImageObjs$);
      }

      //increment frame
      if (frame < config.videoLength) frame++;
      frameSliderEl.value = frame;

      //FPS Counter
      if (p.frameCount % 10 == 0) {
        fpsDisplayEl.innerHTML = p.nf(p.frameRate(), 2, 0).slice(0, -1);
      }

      //Display all shapes
      p.background(30);
      for (let shape of shapes$) {
        shape.display(p, frame);
      }

      //Capture stuff
      if (frame == 1 && capture) {
        capturer.start();
        captureStart = true;
      }
      if (frame < config.videoLength && captureStart) {
        capturer.capture(p.canvas);
      } else if (frame === config.videoLength && captureStart) {
        capturer.save();
        capturer.stop();
        captureStart = false;
        capture = false;
      }
    };
  };

  document.getElementById("capture").addEventListener("click", (e) => {
    frame = 0;
    capture = true;
  });

  frameSliderEl.addEventListener("input", (e) => {
    frame = frameSliderEl.value;
  });

  new p5(sketch);
};

$();
