$(document).ready(function(){

    //elements
    var character = $(".character");
    var point = $(".point");
    var pointHolder = $(".points");
    var levelHolder = $(".levels");
    var menu = $(".menu");
    var startClick = $(".startGame");
    var resetBtn = $(".resetBtn");
    var enemy1 = $(".enemy1");
    var enemy2 = $(".enemy2");

    //variables
    var points = 0;
    var level = 0;
    var keys = {};
    var refBlocker = 0;
    var btnInvis = 1;

    //lvl1-3
    var xPos1 = 10;
    var yPos1 = -60;
    var xSpeed1 = 2;
    var ySpeed1 = 2;

    //lvl4
    var xPos2 = 950;
    var yPos2 = -60;
    var xSpeed2 = 2;
    var ySpeed2 = 2;

    var updatePos = (enemy, xPos, yPos) => {
        enemy.css("left", xPos + 'px');
        enemy.css("top", yPos + 'px');
    }

    var setPosition = (top, left, element) => {

        if(top == 0 && left == 0){
            do{
                top = Math.floor((Math.random()*480)-49);
                left = Math.floor((Math.random()*980)+1);
            }while(((parseInt(character.css("top")) - top < 70) && (parseInt(character.css("top")) - top > 0))
            || ((parseInt(character.css("left")) - left < 20) && (parseInt(character.css("left")) - left > -50)));
        }

        element.css("top", top);
        element.css("left", left);
    }

    //levels
    var level1 = () => {
        level = 1;
        levelHolder.html(level);

        xSpeed1 = 2;
        ySpeed1 = 2;

        setPosition(225, 100, character);
        setPosition(0, 0, point);
        setPosition(-70, 485, enemy1);

        enemy1.show();
    }

    var Level2 = () => {
        level = 2;
        levelHolder.html(level);

        xSpeed1 = 3;
        ySpeed1 = 3;
    }

    var Level3 = () => {
        level = 3;
        levelHolder.html(level);

        xSpeed1 = 4;
        ySpeed1 = 4;
    }

    var Level4 = () => {
        level = 4;
        levelHolder.html(level);

        xSpeed1 = 5;
        ySpeed1 = 5;
    }

    var Level5 = () => {
        level = 5;
        levelHolder.html(level);

        xSpeed1 = 2;
        ySpeed1 = 2;
        xSpeed2 = -2;
        ySpeed2 = -2;

        enemy2.show();
    }

    var Level6 = () => {
        level = 6;
        levelHolder.html(level);

        xSpeed1 = 3;
        ySpeed1 = 3;
        xSpeed2 = -3;
        ySpeed2 = -3;
    }

    var Level7 = () => {
        level = 7;
        levelHolder.html(level);

        xSpeed1 = 4;
        ySpeed1 = 4;
        xSpeed2 = -4;
        ySpeed2 = -4;
    }

    var Level8 = () => {
        level = 8;
        levelHolder.html(level);

        xSpeed1 = 5;
        ySpeed1 = 5;
        xSpeed2 = -5;
        ySpeed2 = -5;
    }

    var Level9 = () => {
        level = 9;
        levelHolder.html(level);

        xSpeed1 = 6;
        ySpeed1 = 6;
        xSpeed2 = -6;
        ySpeed2 = -6;
    }

    var Level10 = () => {
        level = 10;
        levelHolder.html(level + " (max)");

        xSpeed1 = 7;
        ySpeed1 = 7;
        xSpeed2 = -7;
        ySpeed2 = -7;
    }

    var showMenu = () => {
        point.hide();
        menu.show();
        resetBtn.addClass('btnInvis');
        resetBtn.html("");
        btnInvis = 1;

        $(".enemy").each(function(){
            $(this).hide();
        });
        
        setPosition(350, 475, character);
    }

    var hideMenu = () => {
        menu.hide();
        point.show();
        resetBtn.removeClass('btnInvis');
        resetBtn.html("reset");
        btnInvis = 0;
        setPosition(0, 0, point);
        points = 0;
        pointHolder.html("0");
        level1();
    }

    showMenu();
    
    $(document).keydown(function (e) {
        keys[e.which] = true;
    });
    
    $(document).keyup(function (e) {
        delete keys[e.which];
    });
    
    //start game
    startClick.click(() => {
        hideMenu();
        refBlocker = 1;
    });

    //reset game
    resetBtn.click(() => {
        if(!btnInvis){
            showMenu();
            refBlocker = 0;
        }
    });

    var check = setInterval(() => {

        //game start
        if(keys[32] && !refBlocker){
            hideMenu();
            refBlocker = 1;
        }

        //steering
        if(menu.is(":hidden")){
            if(keys[39] && parseInt(character.css("left")) < 950){
            character.css("left", "+=5px");
            }
            if(keys[37] && parseInt(character.css("left")) > 0){
                character.css("left", "-=5px");
            }
            if(keys[38] && parseInt(character.css("top")) > 0){
                character.css("top", "-=5px");
            }
            if(keys[40] && parseInt(character.css("top")) < 450){
                character.css("top", "+=5px");
            }

            //add point
            if((parseInt(character.css("top")) - parseInt(point.css("top")) < 70) && (parseInt(character.css("top")) - parseInt(point.css("top")) > 0)){
                if((parseInt(character.css("left")) - parseInt(point.css("left")) < 20) && (parseInt(character.css("left")) - parseInt(point.css("left")) > -50)){
                    setPosition(0, 0, point);
                    points++;
                    pointHolder.html(points);
                    if(points == 5) Level2();
                    if(points == 10) Level3();
                    if(points == 15) Level4();
                    if(points == 20) Level5();
                    if(points == 25) Level6();
                    if(points == 30) Level7();
                    if(points == 35) Level8();
                    if(points == 40) Level9();
                    if(points == 45) Level10();
                }
            }
        }

        if(level >= 1 && level <= 4){

            //enemy engine
            if(xPos1 + parseInt(enemy1.css("width")) >= 1000 || xPos1 <= 0){
            xSpeed1 = -xSpeed1;
            }
            if(yPos1 + parseInt(enemy1.css("height")) >= 500 - 70 || yPos1 <= 0 - 70){
                ySpeed1 = -ySpeed1;
            }
            xPos1 += xSpeed1;
            yPos1 += ySpeed1;

            updatePos(enemy1, xPos1, yPos1);

            //hit detection
            if((parseInt(character.css("top")) - parseInt(enemy1.css("top")) <= 100) && (parseInt(character.css("top")) - parseInt(enemy1.css("top")) >= 20)){
                if((parseInt(character.css("left")) - parseInt(enemy1.css("left")) <= 30) && (parseInt(character.css("left")) - parseInt(enemy1.css("left")) >= -50)){
                    refBlocker = 0;
                    showMenu();
                }
            }

        }

        if(level >= 5){
            //enemy1 engine
            if(xPos1 + parseInt(enemy1.css("width")) >= 1000 || xPos1 <= 0){
            xSpeed1 = -xSpeed1;
            }
            if(yPos1 + parseInt(enemy1.css("height")) >= 500 - 70 || yPos1 <= 0 - 70){
                ySpeed1 = -ySpeed1;
            }
            xPos1 += xSpeed1;
            yPos1 += ySpeed1;

            updatePos(enemy1, xPos1, yPos1);

            //enemy2 engine
            if(xPos2 + parseInt(enemy2.css("width")) >= 1000 || xPos2 <= 0){
            xSpeed2 = -xSpeed2;
            }
            if(yPos2 + parseInt(enemy2.css("height")) >= 500 - 100 || yPos2 <= 0 - 100){
                ySpeed2 = -ySpeed2;
            }
            xPos2 += xSpeed2;
            yPos2 += ySpeed2;

            updatePos(enemy2, xPos2, yPos2);

            //hit1 detection
            if((parseInt(character.css("top")) - parseInt(enemy1.css("top")) <= 100) && (parseInt(character.css("top")) - parseInt(enemy1.css("top")) >= 20)){
                if((parseInt(character.css("left")) - parseInt(enemy1.css("left")) < 30) && (parseInt(character.css("left")) - parseInt(enemy1.css("left")) > -50)){
                    refBlocker = 0;
                    showMenu();
                }
            }

            //hit2 detection
            if((parseInt(character.css("top")) - parseInt(enemy2.css("top")) <= 130) && (parseInt(character.css("top")) - parseInt(enemy2.css("top")) >= 50)){
                if((parseInt(character.css("left")) - parseInt(enemy2.css("left")) <= 30) && (parseInt(character.css("left")) - parseInt(enemy2.css("left")) >= -50)){
                    refBlocker = 0;
                    showMenu();
                }
            }
        }

    }, 1000/60);

    // //show elements positions (test function)
    // $(document).click(() => {
    //     console.log("");
    //     console.log("point top: " + parseInt(point.css("top")));
    //     console.log("character top: " + parseInt(character.css("top")));
    //     console.log("");
    //     console.log("point left: " + parseInt(point.css("left")));
    //     console.log("character left: " + parseInt(character.css("left")));
    //     console.log("");
    //     console.log("==========================================");
    // })

    // //show currently clicked keys (test function)
    // function printKeys() {
    //     var html = '';
    //     for (var i in keys) {
    //         if (!keys.hasOwnProperty(i)) continue;
    //         html += i + "  ";
    //     }
    //     console.log(html);
    // }
    
});
