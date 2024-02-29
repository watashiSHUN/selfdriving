class NeuralNetwork{
    // [X, Y, Z] => [3, 4, 2] => 3 input, 4 hidden, 2 output
    // [X, Y, Z, A] => [4, 5, 3, 2] => 4 input, 5 hidden, 3 hidden, 2 output
    constructor(neurons){
        this.levels = [];
        for(let i = 0; i < neurons.length-1; i++){
            this.levels.push(new Level(neurons[i], neurons[i+1]));
        }
    }

    static feedForward(input, network){
        let output = input;
        for(let i = 0; i < network.levels.length; i++){
            output = Level.feedForward(output, network.levels[i]);
        }
        return output;
    }
}

class Level{
    // We need to set weights and biasis (the meat of a neural network)
    constructor(inputCount, outputCount){
        // input and output are both getting values
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        // TODO(shunxian): threshold for output?
        this.biases = new Array(outputCount);

        // mesh connections, weighted edges
        // [edges of node 0:[0,1,0.8...], edges of node 1:[0,1,0.8...], ...]
        this.weights = [];
        for(let i = 0; i < inputCount; i++){
            this.weights.push(new Array(outputCount));
        }
        // initialize to random value
        // TODO(shunxian): why static method, why static private method?
        // because we need to serialize this object
        Level.#randomize(this);
    }
    static #randomize(level){
        for(let i = 0; i < level.inputCount; i++){
            for(let j = 0; j < level.outputCount; j++){
                // randomly assign a weight to each edge [-1, 1]
                // TODO(shunxian): why -1 and 1
                level.weights[i][j] = Math.random()*2-1;
            }
        }
        for(let i = 0; i < level.outputCount; i++){
            level.biases[i] = Math.random()*2-1;
        }
    }

    // compute the outputs
    // static method, we need `level` as input
    static feedForward(input, level){
        // first pass the input to level.input
        for(let i = 0; i < level.inputCount; i++){
            level.inputs[i] = input[i];
        }

        // function we use is sum(input*weight)
        // weight*input + bias = 0 => linear equation, a line with slope (weight) and y-intercept (bias)
        
        for(let j = 0; j < level.outputCount; j++){
            for (let i = 0; i < level.inputCount; i++){
            let sum = 0;
                for(let i = 0; i < level.inputCount; i++){
                    sum += level.inputs[i]*level.weights[i][j];
                }
                // binary output
                if (sum > level.biases[j]){
                    level.outputs[j] = 1; 
                } else {
                    level.outputs[j] = 0;
                }
            }
        }
        return level.outputs;
    }
}