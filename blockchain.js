const Block = require('./block');

class Blockchain {
  constructor () {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    if(JSON.stringify(chain[0] !== Block.genesis())) return false;
    
    for(let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i-1];

      if(currentBlock.lastHash !== previousBlock.hash || currentBlock.hash !== Block.blockHash(currentBlock)) {
        return false;
      }
    }
  }
}

module.exports = Blockchain;