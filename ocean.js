// The surf poster is decorative. All game rules live in game.js.
const ocean = document.querySelector("#ocean");
const brush = ocean.getContext("2d");

function paintBreak() {
  const width = ocean.clientWidth;
  const height = ocean.clientHeight;
  if (!brush || !width || !height) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  ocean.width = Math.round(width * ratio);
  ocean.height = Math.round(height * ratio);
  brush.setTransform(ratio, 0, 0, ratio, 0, 0);
  const scale = Math.max(width / 800, height / 280);
  brush.translate(width - 800 * scale, height - 280 * scale);
  brush.scale(scale, scale);

  function fill(color, path) {
    brush.fillStyle = color;
    brush.fill(new Path2D(path));
  }
  function stroke(color, weight, path) {
    brush.strokeStyle = color;
    brush.lineWidth = weight;
    brush.stroke(new Path2D(path));
  }
  const sky = brush.createLinearGradient(0, 0, 0, 200);
  sky.addColorStop(0, "#f6c6a3");
  sky.addColorStop(1, "#ffe1ab");
  brush.fillStyle = sky;
  brush.fillRect(0, 0, 800, 280);
  brush.fillStyle = "#ff805e";
  brush.beginPath();
  brush.arc(495, 96, 48, 0, Math.PI * 2);
  brush.fill();
  for (let row = 0; row < 5; row++) {
    brush.fillStyle = "#ffcf9f";
    brush.fillRect(445, 110 + row * 6, 100, 1 + row * .5);
  }
  fill("#91b7a4", "M0 158 Q95 148 165 153T330 147 Q408 143 455 149 Q508 143 568 149 L800 144V280H0Z");
  fill("#5c9f99", "M0 166 Q101 153 207 164T408 161 Q505 155 610 159T800 153V280H0Z");
  fill("#277a80", "M0 189 Q104 163 217 177 Q353 192 451 158 C508 138 549 91 606 76 C657 61 709 83 711 117 C693 102 676 101 665 109 C634 129 655 166 706 170 Q755 175 800 149V280H0Z");
  fill("#d8ebd0", "M422 170 C508 147 543 101 600 80 C640 65 704 71 712 118 Q699 100 681 102 Q675 95 665 102 Q651 98 641 106 Q638 102 627 108 C616 112 615 100 597 111 C558 125 512 159 422 170Z");
  fill("#184e60", "M589 176 C612 144 621 119 654 109 C640 130 647 147 676 161 Q706 179 750 168 C692 201 650 178 633 164 C623 156 613 158 589 176Z");
  fill("#62a99c", "M0 207 Q98 189 205 201 Q364 227 509 170 C427 222 317 239 193 222 Q86 208 0 226Z");
  fill("#185464", "M0 240 Q91 212 200 230 Q354 255 477 212 C575 178 632 191 730 199 Q761 202 800 190V280H0Z");
  fill("#206b74", "M0 257 Q116 230 203 248 Q361 275 517 225 Q617 193 721 214 Q753 222 800 206V280H0Z");
  brush.lineCap = "round";
  for (let n = 0; n < 7; n++) {
    stroke(n % 2 ? "#61a497" : "#40928e", 1.6,
      "M" + (254 + n * 31) + " " + (195 + n * 2) +
      " Q" + (429 + n * 17) + " " + (192 - n * 3) + " " + (566 + n * 12) + " " + (122 - n * 2));
  }
  stroke("#b1d2b9", 2, "M18 189 Q73 178 115 177 M134 177 Q159 177 179 179 M406 226 Q468 217 511 200 M697 192 Q744 197 778 184");
  stroke("#70a79c", 2, "M44 241 Q99 229 171 237 M558 220 Q623 202 681 213 M270 259 Q344 269 416 249");
  stroke("#926f5f", 1.8, "M561 47 Q567 46 570 51 Q574 46 580 46 M580 37 Q584 36 587 40 Q590 36 595 36");
}

paintBreak();
window.addEventListener("resize", paintBreak);
