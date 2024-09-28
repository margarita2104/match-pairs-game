// Generating an array of pairs of numbers

function createNumbersArray(count) {
  const numbersArray = [];
  for (let i = 1; i <= count; i++) {
    numbersArray.push(i, i);
  }
  return numbersArray;
}

// Shuffling an array with Fisher–Yates algorithm

function shuffle(arr) {
  let oldElement;
  for (let i = arr.length - 1; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    oldElement = arr[i];
    arr[i] = arr[random];
    arr[random] = oldElement;
  }
  return arr;
}

// Creating pairs of cards based on the input

document.addEventListener("DOMContentLoaded", function (event) {
  const button = document.getElementById("button");
  let totalPairs = 0;
  let matchedPairs = 0;

  function startGame(count) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    totalPairs = count;
    matchedPairs = 0;

    const numbersArray = createNumbersArray(count);
    const shuffledNumbers = shuffle(numbersArray);

    for (let i = 0; i < shuffledNumbers.length; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      const content = document.createElement("span");
      content.textContent = shuffledNumbers[i];
      content.style.display = "none";

      tile.appendChild(content);
      container.append(tile);
    }

    checkCards();
  }

  // Checking if the cards match

  function checkCards() {
    const tiles = document.getElementsByClassName("tile");
    let firstTile = null;
    let secondTile = null;
    let isChecking = false;

    for (let tile of tiles) {
      tile.addEventListener("click", () => {
        if (isChecking) return;

        const content = tile.querySelector("span");
        content.style.display = "block";

        if (!firstTile) {
          firstTile = tile;
          tile.classList.add("bg-warning");
        } else if (!secondTile && tile !== firstTile) {
          secondTile = tile;
          tile.classList.add("bg-warning");

          isChecking = true;

          setTimeout(() => {
            const firstContent = firstTile.querySelector("span");
            const secondContent = secondTile.querySelector("span");

            if (firstContent.textContent === secondContent.textContent) {
              firstTile.classList.remove("bg-warning");
              secondTile.classList.remove("bg-warning");
              firstTile.classList.add("bg-success");
              secondTile.classList.add("bg-success");

              matchedPairs++;

              if (matchedPairs == totalPairs) {
                setTimeout(() => {
                  alert(
                    "Congratulations! You've matched all pairs and won the game!"
                  );
                }, 500);
              }
            } else {
              firstTile.classList.remove("bg-warning");
              secondTile.classList.remove("bg-warning");

              firstContent.style.display = "none";
              secondContent.style.display = "none";
            }

            firstTile = null;
            secondTile = null;
            isChecking = false;
          }, 1000);
        }
      });
    }
  }

  button.addEventListener("click", () => {
    const pairsCount = document.getElementById("pairs-count").value;
    startGame(pairsCount);
  });
});
