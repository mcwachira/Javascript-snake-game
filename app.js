let ctx =  document.getElementById('ctx').getContext('2d')
  

let height = 500;
let width =  500;
let snakeList, foodList, direction,eaten, intervalVar, score, running

ctx.font = '25px Calibri'

 ctx.fillText('click me to start the game', 120, 230)

let snakeBody  = {
    height:20,
    width:20 ,
    color:'blue' 
}

let snakeFood = {
    height:20,
    width:20,
    color:'green'
}
drawSnake =  function(sb, index)    {
    ctx.save()
    if(index ===0)   {
        ctx.fillStyle = 'brown'
    }else{
        ctx.fillStyle = snakeBody.color

    }
        ctx.fillRect(sb.x, sb.y, snakeBody.width, snakeBody.height)
    ctx.restore()
}

drawFood = function(f, index)   {
    ctx.save()
    ctx.fillStyle = snakeFood.color
    ctx.fillRect(f.x, f.y, snakeFood.width, snakeFood.height)
    ctx.restore()
}


document.onmousedown =  function(){

    if(running) {
        clearInterval(intervalVar)
        running =  false;
    }
        startGame()
}
document.onkeydown =  function(event)   {
    if(event.keyCode === 37 && direction != 2)    {
        direction = 0
      
        direction === 0
    }else  if(event.keyCode === 38 && direction != 3)    {
       direction = 1
     
    }  else  if(event.keyCode === 39  && direction != 0)    {
        direction = 2
     
    }else  if(event.keyCode === 40 && direction != 1)    {
        direction  = 3
     
    }
}

updateSnakeList = function()    {
    for(let i = snakeList.length-1; i>=0;i--)   {
        if(direction ==  0) {
          if(i == 0)  {
    snakeList[i].x =  snakeList[i].x - 5
            }
            else{
                snakeList[i].x = snakeList[i-1].x;
                snakeList[i].y = snakeList[i-1].y;
            }
    }  else if (direction == 1) { 
        if(i == 0)  {
            snakeList[i].y =  snakeList[i].y -5
                    }
                    else{
                        snakeList[i].x = snakeList[i-1].x;
                        snakeList[i].y = snakeList[i-1].y;
                    }
               
    }else if (direction == 2)   {
        if(i == 0)  {
            snakeList[i].x =  snakeList[i].x + 5
                    }
                    else{
                        snakeList[i].x = snakeList[i-1].x;
                        snakeList[i].y = snakeList[i-1].y;
                    }
               
    } else if (direction == 3) {
        if(i == 0)  {
            snakeList[i].y =  snakeList[i].y + 5
                    }
                    else{
                        snakeList[i].x = snakeList[i-1].x;
                        snakeList[i].y = snakeList[i-1].y;
                    }
               
    }
    } 
}


testCollision =  function(snakeRec, foodRec) {

    return ((snakeRec.x <= foodRec.x + snakeFood.width) &&  (foodRec.x <= snakeRec.x + snakeBody.width) && (snakeRec.y <= foodRec.y + snakeFood.height) &&  (foodRec.y <= snakeRec.y + snakeBody.height))
}

testCollisionSnake =  function (snake1, snake2)    {

    return((Math.abs(snake1.x -snake2.x) <5)  && (Math.abs(snake1.y -snake2.y) <5) )
    
    // return ((snake1.x <= snake2.x + snakeBody.width) &&  (snake2.x <= snake1.x + snakeBody.width) && (snake1.y <= snake2.y + snakeBody.height) &&  (snake2.y <= snake1.y + snakeBody.height))
}
checkSnakePosition =  function()    {
    if(snakeList[0].x > 500)    {
        snakeList[0].x = 0
    } else  if(snakeList[0].y > 500)    {
        snakeList[0].y = 0
    } else  if(snakeList[0].x < 0)    {
        snakeList[0].x = 500
    }else  if(snakeList[0].y < 0)    {
        snakeList[0].y = 500
    }
}

 isGameOver =  function(){
     for(i in snakeList){
        if(i == 0)    
            continue;
            if(testCollisionSnake(snakeList[0], snakeList[i]))  {
                clearInterval(intervalVar)
                
 ctx.fillText(' Game over click me to restart the game', 120, 230)
     }
       
 }

}
updateSnakePosition =  function()   {
    ctx.clearRect(0,0, width, height)
    
    while(eaten){
        let  fPos_x = Math.random()*485+5
         let  fPos_y =  Math.random()*485+5
         foodList[0] = {x:fPos_x, y:fPos_y }
          eaten = false
   }

    foodList.forEach(drawFood) 
    snakeList.forEach(drawSnake)

    if(testCollision(snakeList[0], foodList[0]))    {

        foodList = []
        eaten = true;
        score +=1
        let new_posX, new_posY;
        if(direction == 0)  {
           new_posX =  snakeList[0].x -10
           new_posY = snakeList[0].y
        } else  if(direction ==1)  {
            new_posX =  snakeList[0].x 
            new_posY = snakeList[0].y - 10
         } else  if(direction ==2)  {
            new_posX =  snakeList[0].x + 10
            new_posY = snakeList[0].y
         } else  if(direction ==3)  {
            new_posX =  snakeList[0].x
            new_posY = snakeList[0].y + 10
         }
         snakeList.unshift({x:new_posX, y: new_posY})
    }

    ctx.fillText("Score "+score, 410,30)
    isGameOver()
    checkSnakePosition()
    updateSnakeList()
}





startGame = function()  {
    snakeList = [
        {x:220,y:200},
        {x:200,y:200},
        {x:180,y:200}
    ]
    foodList =  []
    direction = 99
    score = 0
    
    eaten = true
    running=  true;
   intervalVar =  setInterval(updateSnakePosition, 20)
}






































