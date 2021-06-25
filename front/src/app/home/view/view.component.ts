import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InterpretadorService } from '../service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  form: FormGroup;
  resultado: []

  constructor(
    private fb: FormBuilder,
    private interpretador: InterpretadorService
  ) { }

  ngOnInit(): void {
    this.gerarForm()
  }

  interpretar() {
    let texto = this.form.get('texto').value;
    this.interpretador.interpretar(texto).subscribe(
      data => {
        this.resultado = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  gerarForm() {
    this.form = this.fb.group({
      texto: ['se 2 e maior que 1 entao armazenar 2 em x senao armazenar 1 em x\nescreva x\narmazenar x vezes 8 em x\nescreva x 3 vezes\nse x e maior que 17 entao escreva x senao escreva o quadruplo de x\nse x e maior que 15 entao escreva "OKAY"\nescreva "feito" 3 vezes\nescrever o dobro de (4 mais 3)\nescrever o dobro de 4 mais 3\nescrever o sexto item de [1,2,4,5,555,7]\nescreva o menor item de [1,2,4,5,555,7]\nescreva o maior item de [1,2,4,5,555,7]\n']
    });
  }

}
