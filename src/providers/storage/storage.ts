import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(public storage: Storage) {}

  setDadosEstat(dados: Array<number>, posicao: number) {
    return this.storage.set('DADOS'+posicao, dados);
  }

  getDadosEstat(posicao: number) {
    return this.storage.get('DADOS'+posicao);
  }

  limparArmazenamento() {
    return this.storage.clear();
  }

}
