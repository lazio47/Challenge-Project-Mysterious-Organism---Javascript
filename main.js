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

// The Pila aequor
const pAequorFactory = (specimenNum, dna) => {
  return { 
          specimenNum,
          dna,
          mutate() {
            let dnaBases = ['A', 'T', 'C', 'G']
            const basePos = Math.floor(Math.random() * 15);
            let base = this.dna[basePos];
            dnaBases = dnaBases.filter(el => el !== base);
            this.dna[basePos] = dnaBases[Math.floor(Math.random() * 3)];
            return this.dna;
          },
          compareDNA(pAequor) {
            let numOfSameBase = 0;
            for (let i = 0; i < 15; i++){
              if (pAequor.dna[i] === this.dna[i]) {
                numOfSameBase++;
              }
            }
            console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${100 * numOfSameBase/15}% DNA in common`);
          },
          willLikelySurvive() {
            const numOfC = this.dna.filter(el => el === 'C').length;
            const numOfG = this.dna.filter(el => el === 'G').length;
            return numOfC / 15 >= 0.6 || numOfG / 15 >= 0.6;
          },
          complementStrand() {
            return this.dna.map(el => {
              if(el === 'A'){
                return 'T';
              }
              if (el === 'T') {
                return 'A';
              }
              if (el === 'C') {
                return 'G';
              }
              if (el === 'G') {
                return 'C';
              }
            });
          }
          }
}

// Creating 30 instances of pAequor that can survive in their natural environment.
let numOfInstaces = 0;
let pAequors = [];

while (numOfInstaces < 30) {
  let pAequor = pAequorFactory(numOfInstaces + 1, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    pAequors.push(pAequor);
    numOfInstaces++;
  }
}
console.log(pAequors);

// Question 9 test
const pa = pAequorFactory(90, mockUpStrand());
console.log(pa.dna);
console.log(pa.complementStrand());

// I thought I had to do it in the object method. This is the wizard's solution:
let mostRelatedPair = [];
let highestPercentage = 0;

for (let i = 0; i < pAequors.length; i++) {
  for (let j = i + 1; j < pAequors.length; j++) {
    let numOfSameBase = 0;
    for (let k = 0; k < 15; k++) {
      if (pAequors[i].dna[k] === pAequors[j].dna[k]) {
        numOfSameBase++;
      }
    }
    let percentage = (numOfSameBase / 15) * 100;
    if (percentage > highestPercentage) {
      highestPercentage = percentage;
      mostRelatedPair = [pAequors[i], pAequors[j]];
    }
  }
}

console.log(`The most related pair is specimen #${mostRelatedPair[0].specimenNum} and specimen #${mostRelatedPair[1].specimenNum} with ${highestPercentage.toFixed(2)}% DNA in common.`);





