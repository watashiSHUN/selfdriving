// Draw neural network as dots and lines
// 
class Visualizer {
    // All levels are equally spaced
    static drawNetwork(ctx, neuralNetwork){
        const margin = 50;
        // top left corner
        const left = margin; // x
        const top = margin; // y
        const width = ctx.canvas.width-margin*2;
        const height = ctx.canvas.height-margin*2;

        const levelHeight = height/neuralNetwork.levels.length;

        // TODO: We need to draw the last level first (layer at the bottom)
        for(let i = 0; i < neuralNetwork.levels.length; i++){
            let level = neuralNetwork.levels[i];
            // Level starts from the bottom
            Visualizer.drawLevel(ctx, level, width, levelHeight, left, top+height-levelHeight*(i+1));
        }
    }

    // TODO: currently the levels overlap with each other
    static drawLevel(ctx, level, width, height, left, top){
        let inputNode = level.inputs;
        let outputNode = level.outputs;
        let inputNodeCoordinate = {};
        let outputNodeCoordinate = {};
        let radius = 25;
        // (1) Compute node coordinates
        // (2) Draw the lines
        // (3) Draw the nodes (layer on top of the lines)

        inputNode.forEach((element, index) => {
            let x = linearInterpolation(left,left+width,(index+0.5)/inputNode.length);
            let y = top+height;
            inputNodeCoordinate[index] = {x, y};
        });

        outputNode.forEach((element, index) => {
            let x = linearInterpolation(left,left+width,(index+0.5)/outputNode.length);
            let y = top;
            outputNodeCoordinate[index] = {x, y};
        });

        for(let i = 0; i < inputNode.length; i++){
            for(let j = 0; j < outputNode.length; j++){
                let edgeWeight = level.weights[i][j];
                // we need start end end coordinate for the lines
                let ab = {start:{x:inputNodeCoordinate[i].x, y:inputNodeCoordinate[i].y}, end:{x:outputNodeCoordinate[j].x, y:outputNodeCoordinate[j].y}};
                drawLines([ab], ctx, getColor(edgeWeight), edgeWeight*5);
            }
        }

        inputNode.forEach((element, index) => {
            drawDot(inputNodeCoordinate[index], ctx, "white", radius);
        });

        // TODO: draw biasis as text
        outputNode.forEach((element, index) => {
            drawDot(outputNodeCoordinate[index], ctx, "white", radius);
        });

    }
}