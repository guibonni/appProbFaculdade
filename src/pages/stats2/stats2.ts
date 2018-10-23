import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-stats2',
  templateUrl: 'stats2.html',
})
export class Stats2Page {
  posicao: number;
  dadosArray: Array<number>;
  ordenadosArray: Array<number>;
  dadosTexto: string;
  ordenadosTexto: string;
  media: number;
  moda: number;
  mediana: number;
  arrayFreq: Array<Array<number>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public toastCtrl: ToastController) {
    this.posicao = this.navParams.get('armazenamento');

    this.storage.getDadosEstat(this.posicao)
      .then((dados) => {
        this.dadosArray = dados;
        if (this.dadosArray) {
          this.calcularInformacoes();    
        } else {
          this.chamaToast("Não existem dados salvos nesse espaço de armazenamento.", 3000);
          this.navCtrl.pop();
        }
      });
  }

  calcularInformacoes() {
    // Exibir dados
    this.dadosTexto = this.dadosArray.toString();

    // Exibir dados ordenados
    this.ordenadosArray = this.ordenarVetor(this.dadosArray);
    this.ordenadosTexto = this.ordenadosArray.toString();

    this.calcularFrequencias(this.definirVariavel());
    this.calcularMedia(this.definirVariavel());
    this.calcularMediana(this.definirVariavel());
    this.calcularModa(this.definirVariavel());
  }

  ordenarVetor(vetor: Array<number>): Array<number> {
    let h: number = 1;
    let n: number = vetor.length;

    while (h < n) {
      h = h * 3 + 1;
    }
    h = h / 3;
    h = parseInt(h.toString());

    let c: number, j: number;

    while (h > 0) {
      for (let i = h; i < n; i++) {
        c = vetor[i];
        j = i;
        while (j >= h && vetor[j - h] > c) {
          vetor[j] = vetor[j - h];
          j = j - h;
        }
        vetor[j] = c;
      }
      h = h / 2;
      h = parseInt(h.toString());
    }

    return vetor;
  }

  definirVariavel(): boolean {
    // Retorna true para variável discreta e false para variável contínua
    let quant: number = 1;
    for (let i=1; i<this.ordenadosArray.length; i++) {
      if (this.ordenadosArray[i] != this.ordenadosArray[i-1]) {
        quant++;
      }
    }
  
    if (quant <= 20) {
      return true;
    } else {
      return false;
    }
  }

  calcularFrequencias(variavel: boolean) {
    this.arrayFreq = [];
    if (variavel) {
      this.arrayFreq.push([this.ordenadosArray[0],1,0,0,0])
      let posAtual: number = 0;
      for (let i=1; i<this.ordenadosArray.length; i++) {
        if (this.ordenadosArray[i] == this.ordenadosArray[i-1]) {
          this.arrayFreq[posAtual][1]++;
        } else {
          this.arrayFreq.push([this.ordenadosArray[i],1,0,0,0]);
          posAtual++;
        }
      }

      // Calcular a porcentagem e a frequência acumulada
      for (let i=0; i<this.arrayFreq.length; i++) {
        // Porcentagem
        this.arrayFreq[i][2] = parseFloat((this.arrayFreq[i][1] / this.ordenadosArray.length * 100).toFixed(3).toString());

        // Frequência acumulada
        for (let j=0; j<=i; j++) {
          this.arrayFreq[i][3] += this.arrayFreq[j][1];
          this.arrayFreq[i][4] += this.arrayFreq[j][2];
        }
        this.arrayFreq[i][4] = parseFloat(this.arrayFreq[i][4].toFixed(3));
      }

    }
  }

  calcularMedia(variavel: boolean) {
    if (variavel) {
      this.media = 0;
      for (let i=0; i<this.ordenadosArray.length; i++) {
        this.media += this.ordenadosArray[i];
      }
      this.media = this.media / this.ordenadosArray.length;
    }

  }

  calcularModa(variavel: boolean) {
    if (variavel) {
      this.moda = this.arrayFreq[0][0];
      let quantModa = this.arrayFreq[0][1];
      for(let i=1; i<this.arrayFreq.length; i++) {
        if (this.arrayFreq[i][1] > quantModa) {
          this.moda = this.arrayFreq[i][0];
          quantModa = this.arrayFreq[i][1];
        }
      }
    }
  }

  calcularMediana(variavel: boolean) {
    if (variavel) {
      let meio: number = this.ordenadosArray.length / 2;
      if (this.ordenadosArray[meio]) {
        this.mediana = this.ordenadosArray[meio];
      } else {
        let meio1: number = (this.ordenadosArray.length - 1) / 2;
        let meio2: number = meio1 + 1;

        this.mediana = (this.ordenadosArray[meio1] + this.ordenadosArray[meio2]) / 2;

      }
    }
  }

  chamaToast(mensagem: string, tempo: number) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: tempo,
      position: "middle"
    });

    toast.present();
  }

}
