const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 70,
    height: 10,
    speed: 20,
    color: '#A1ED1F',
    score: 0
};

const enemies = [];
const enemySpeed = 3.55;
const enemyProbability = 0.075;

function createEnemy() {
    const x = Math.random() * (canvas.width - 30);
    const y = 0;
    const width = 25;
    const height = 25;
    const speed = enemySpeed;
    const color = "#" + Math.floor(Math.random()*787867).toString();

    return { x, y, width, height, speed, color };
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    for (const enemy of enemies) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

function updatePlayer() {
    const keys = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false
    };
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }

    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }

    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }

    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

function updateEnemies() {
    for (const enemy of enemies) {
        enemy.y += enemy.speed;

        if (enemy.y + enemy.height > canvas.height) {
            enemies.splice(enemies.indexOf(enemy), 1);
            player.score++;
        }

        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            enemies.splice(enemies.indexOf(enemy), 1);
            player.score-=10;
        }
    }

    if (Math.random() < enemyProbability) {
        enemies.push(createEnemy());
    }

    document.querySelector('title').innerHTML = player.score;}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();

    updatePlayer();
    updateEnemies();

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${player.score}`, 10, 30);

    requestAnimationFrame(animate);
}
document.addEventListener('keydown', (event) => {
    const key = event.key;
    switch (key) {
        case 'ArrowLeft':  player.x -= player.speed; break;
        case 'ArrowRight': player.x += player.speed; break;
    }
});

animate();