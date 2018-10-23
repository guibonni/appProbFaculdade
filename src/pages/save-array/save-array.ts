import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-save-array',
  templateUrl: 'save-array.html',
})
export class SaveArrayPage {
  valoresText: string = '';
  posicaoSalvar: Array<number> = [1,2,3,4,5];
  posicaoSalvarAtual: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public toastCtrl: ToastController) {}

  salvarDados() {
    let valoresArray: Array<any> = this.valoresText.split(",");
    for (let i=0; i<valoresArray.length; i++) {
      valoresArray[i] = parseInt(valoresArray[i])
    }

    if (valoresArray) {
      this.storage.setDadosEstat(valoresArray, this.posicaoSalvarAtual)
        .then((resp) => {
          this.chamaToast("Dados salvos com sucesso!", 2000);
          this.valoresText = '';
          this.posicaoSalvarAtual = 1;
        });
    } else {
      this.chamaToast("Não foi possível salvar. Dados inválidos.", 2500);
    }
  }

  limparDados() {
    this.posicaoSalvarAtual = 1;
    this.valoresText = '';
    this.storage.limparArmazenamento()
      .then(() => this.chamaToast("Dados excluídos com sucesso!", 2000));
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
