// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (number, dna) => {
  return {
    specimenNum: number,
    dna: dna,
    mutate() {
      const dnaBasesA = ['T', 'C', 'G'];
      const dnaBasesT = ['A', 'C', 'G'];
      const dnaBasesC = ['A', 'T', 'G'];
      const dnaBasesG = ['A', 'T', 'C'];

      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'A') {
          this.dna[i] = dnaBasesA[Math.floor(Math.random() * 3)]
        } else if (this.dna[i] === 'T') {
          this.dna[i] = dnaBasesT[Math.floor(Math.random() * 3)]
        } else if (this.dna[i] === 'C') {
          this.dna[i] = dnaBasesC[Math.floor(Math.random() * 3)]
        } else {
          this.dna[i] = dnaBasesG[Math.floor(Math.random() * 3)]
        }
      }

      return this.dna;
    },
    compareDNA(pAequor2) {
      let sum = 0;

      for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === pAequor2.dna[i]) {
            sum += 1;
          }
      }
      return Math.floor(sum/15*100);
    },
    willLikelySurvive() {
      let sum = 0;

      for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === 'C' || this.dna[i] === 'G') {
            sum += 1;
          }
      }
      if(sum/15 > 0.6) {
        return true
      } else {
        return false
      }
    }
  }
};


//console.log(DNA1);
//console.log(DNA2);
//console.log(DNA2.willLikelySurvive());

//console.log(DNA1);
//console.log(DNA1.mutate());

const choosePAequorToStudy = () => {
  const listOfpAequorToStudy = [];

  while (listOfpAequorToStudy.length < 30) {
    let pAequor = pAequorFactory(Math.floor(Math.random() * 100), mockUpStrand());

    if(pAequor.willLikelySurvive()) {
      listOfpAequorToStudy.push(pAequor);
    }
  }
  return listOfpAequorToStudy;
}

const complementStrand = obj => {
  const newObj = [];

  for(let i = 0; i < obj.length; i++) {
    if(obj[i] === 'A') {
      newObj.push('T');
    }
    if(obj[i] === 'T') {
      newObj.push('A');
    }
    if(obj[i] === 'C') {
      newObj.push('G');
    }
    if(obj[i] === 'G') {
      newObj.push('C');
    }
  }
  return newObj;
}

//const test = mockUpStrand();

//console.log(test);
//console.log(complementStrand(test));

const DNA1 = pAequorFactory(Math.floor(Math.random() * 100), mockUpStrand());

const batchToTest = choosePAequorToStudy();

console.log(DNA1);
console.log(batchToTest);

const findMostRelated = batch => {
  const similarityRatio = []
  for(let i = 0; i < batch.length; i++) {
    similarityRatio.push(DNA1.compareDNA(batch[i]));
  };
  //const maxSimilarity = Math.max.apply(Math, similarityRatio);
  return similarityRatio;
}

console.log(findMostRelated(batchToTest))

let maxSimilarity = Math.max.apply(Math, findMostRelated(batchToTest));
console.log(maxSimilarity)
