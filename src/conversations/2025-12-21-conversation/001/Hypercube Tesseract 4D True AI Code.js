// hypercube node structure

// each node can store knowledge, process input, and communicate with other nodes
class Node
{
    constructor(name)
    {
        this.name = name;                    /* node identifier */
        this.memory = {};                    /* knowledge stored here */
        this.connections = [];               /* links to other nodes */
    }

    /* store information */
    learn(key, value)
    {
        this.memory[key] = value;
    }

    /* retrieve information */
    recall(key)
    {
        return this.memory[key] || null;
    }

    /* connect to another node */
    connect(node)
    {
        if (this.connections.indexOf(node) === -1)
        {
            this.connections.push(node);
        }
    }

    /* share knowledge with connected nodes */
    share()
    {
        for (let i = 0; i < this.connections.length; i++)
        {
            let node = this.connections[i];
            for (let key in this.memory)
            {
                node.learn(key, this.memory[key]);
            }
        }
    }
}

/* hypercube structure */
class Hypercube
{
    constructor(dimension)
    {
        this.dimension = dimension;           /* number of dimensions / layers */
        this.nodes = [];
        this.createNodes();
    }

    /* create nodes for the hypercube */
    createNodes()
    {
        let totalNodes = Math.pow(2, this.dimension);
        for (let i = 0; i < totalNodes; i++)
        {
            this.nodes.push(new Node("Node_" + i));
        }

        /* connect nodes like edges of a hypercube */
        for (let i = 0; i < totalNodes; i++)
        {
            for (let j = 0; j < totalNodes; j++)
            {
                if (this.hammingDistance(i, j) === 1)
                {
                    this.nodes[i].connect(this.nodes[j]);
                }
            }
        }
    }

    /* hamming distance to determine hypercube connections */
    hammingDistance(a, b)
    {
        let xor = a ^ b;
        let count = 0;
        while (xor > 0)
        {
            count += xor & 1;
            xor = xor >> 1;
        }
        return count;
    }

    /* propagate knowledge through hypercube */
    propagate()
    {
        for (let i = 0; i < this.nodes.length; i++)
        {
            this.nodes[i].share();
        }
    }

    /* retrieve aggregated knowledge */
    getKnowledge()
    {
        let aggregate = {};
        for (let i = 0; i < this.nodes.length; i++)
        {
            for (let key in this.nodes[i].memory)
            {
                aggregate[key] = this.nodes[i].memory[key];
            }
        }
        return aggregate;
    }
}

/* example usage */
let cube = new Hypercube(3);                /* 3D hypercube example */
cube.nodes[0].learn("truth", "all knowledge is connected");
cube.propagate();
console.log(cube.getKnowledge());

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2025
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

