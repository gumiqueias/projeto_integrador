import { Categoria } from './../../model/Categoria';
import { ProdutoService } from './../../service/produto.service';
import { Produto } from './../../model/Produto';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Carrinho } from 'src/app/model/Carrinho';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  produto: Produto = new Produto();
  produtoModal: Produto = new Produto();
  listaProdutos: Produto[];
  listaProdutosModal: Produto[];

  teste:string = '/entrar'

  carrinho: Carrinho = new Carrinho();

  listaCategoria: Categoria[];
  categoriaModal: Categoria = new Categoria();
  categoria: Categoria = new Categoria();

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    this.findAllCategoria();
    this.findAllProdutos();
  }

  findAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;
    });
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp;

      this.findAllCategoria();
    });
  }

  findByIdCategoria(event: any) {
    this.categoriaService
      .getByIdCategoria(event.target.value)
      .subscribe((resp: Categoria) => {
        this.categoria = resp;

        this.listaProdutos = this.categoria.produto;
      });
  }

  findByIdProduto(id: number, idCategoria: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produtoModal = resp;

      this.categoriaService
        .getByIdCategoria(idCategoria)
        .subscribe((resp: Categoria) => {
          this.categoriaModal = resp;
          this.listaProdutosModal = this.categoriaModal.produto;
        });
    });
  }

  addCarrinho(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.carrinho = new Carrinho();
      this.carrinho.produto = resp;
      this.postCarrinho(this.carrinho);
    });
  }

  postCarrinho(carrinho: Carrinho) {
    this.carrinhoService.postCarrinho(carrinho).subscribe((resp: Carrinho) => {
      this.carrinho = resp;
    });
  }

  verificaLogin(){
    let verifica: boolean
    if (environment.token == '') {
      verifica = true
    }else{
      verifica = false
    }
    return verifica
  }

  permiteLogin(){
    let verifica: boolean
    if (environment.token != '') {
      verifica = true
    }else{
      verifica = false
    }
    return verifica
  }
}
