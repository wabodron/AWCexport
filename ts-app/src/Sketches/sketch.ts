export default class Ellipse {
    constructor(p: any) {
        p.setup = () => {
            p.createCanvas(600, 600);
            };
        let x = p.random(0, 600);
        let y = p.random(0, 600);
        p.draw = () => {
            p.background(100);
            p.noStroke();
            p.push();
            p.ellipse(x, y, 200, 200);
            x = x + (p.mouseX - x)/30;
            y = y + (p.mouseY - y)/30;
            p.pop();
        };
    }
}