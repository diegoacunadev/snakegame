   const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 2, y: 2 };
    let score = 0;

    function gameLoop() {
      // Mover cuerpo de la serpiente
      for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
      }

      // Mover cabeza
      snake[0].x += direction.x;
      snake[0].y += direction.y;

      // Colisiones con bordes
      if (
        snake[0].x < 0 || snake[0].x >= tileCount ||
        snake[0].y < 0 || snake[0].y >= tileCount
      ) {
        resetGame();
      }

    //   Colisión con sí mismo
    //   for (let i = 1; i < snake.length; i++) {
    //     if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
    //       resetGame();
    //     }
    //   }

      // Comer comida
      if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({ ...snake[snake.length - 1] });
        score++;
        placeFood();
      }

      draw();
    }

    function draw() {
      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar serpiente
      ctx.fillStyle = "#0f0";
      for (let part of snake) {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
      }

      // Dibujar comida
      ctx.fillStyle = "#f00";
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
      

      // Mostrar puntaje
      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.fillText("Puntaje: " + score, 10, 20);
    }

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    }

    function resetGame() {
      alert("¡Perdiste! Puntaje final: " + score);
      snake = [{ x: 10, y: 10 }];
      direction = { x: 0, y: 0 };
      score = 0;
      placeFood();
    }

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) direction = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y === 0) direction = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x === 0) direction = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x === 0) direction = { x: 1, y: 0 };
          break;
      }
    });

    // Iniciar el juego
    setInterval(gameLoop, 130);