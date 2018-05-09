public class Pilha(max) {
	private int tamanhoMaximo;
	private String arrayPilha = new String[max];
	private int topo;
}

public void inserir(String elemento) {
	topo++;
	arrayPilha[topo] = elemento;
}

public boolean estaCheia() {
	return topo == tamanhoMaximo-1;
}