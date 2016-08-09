using UnityEngine;
using System.Collections;

//renomei o arquivo para Mario.cs
public class Mario : MonoBehaviour {

	Rigidbody2D rb;

	public Transform verificaChao;
	public LayerMask layerChao;
	Animator anim;

	bool isJump;
	bool mini;
	bool nochao;
	float life;
	bool isAttack;
	bool isDefence;

	//utilizado para o prefabs
	public GameObject fogo;

	// Use this for initialization
	void Start () {
		life = 100;
		anim = GetComponent<Animator> ();
		rb = GetComponent<Rigidbody2D> ();

		mini = true;
		anim.SetBool ("mini", mini);
		life = 100;

	}

	// Update is called once per frame
	void Update () {

		if (Input.GetKey(KeyCode.RightArrow)) {
			Andar ("direita");
			anim.SetBool("move", true);
		} else if (Input.GetKey (KeyCode.LeftArrow)) {
			Andar ("esquerda");
			anim.SetBool("move", true);
		} else {

			anim.SetBool("move", false);
		}

		if (Input.GetKeyDown(KeyCode.Space)) {
			Pular ();
			isJump = true;
			anim.SetBool("jump", isJump);
		}


		if(Input.GetKeyDown(KeyCode.C)){
             //Instancia o objeto com o Prefab de referência
             GameObject g = Instantiate(fogo);
             //Colocar o objeto em uma posição próxima ao Mário
             g.transform.position = new Vector2(transform.position.x+0.2f, transform.position.y);
             //para mudar a direção de acordo com a direção do Mario
             g.transform.eulerAngles  = transform.eulerAngles;
		}

		if (Input.GetKey (KeyCode.X)) {
			if ((isAttack == false) && (isDefence == false)) {
				isDefence = true;
				anim.SetBool ("defence", isDefence);
			}

		} else if (isDefence) {
			isDefence = false;
			anim.SetBool ("defence", isDefence);
		}

		if (isJump) {
			if((rb.velocity.y > -0.2) && (rb.velocity.y <= 0)){
				isJump = false;
				anim.SetBool("jump", isJump);

			}

		}
	}

	void Pular(){
		nochao = Physics2D.Linecast (transform.position, verificaChao.position, layerChao);
		if (nochao) {
			rb.AddForce (new Vector2 (0, 40));
		}

	}

	void Andar(string direcao){
		if (direcao == "direita"){
			transform.Translate (new Vector2 (1, 0) * 2 * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,0);
		}else if (direcao == "esquerda"){
			transform.Translate (new Vector2 (1, 0) * 2 * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,180);
		}
	}

	void voltaEstadoNormal(){
		isAttack = false;
		anim.SetBool("attack", isAttack);
	}



	void OnTriggerEnter2D( Collider2D objeto){

		if (objeto.tag == "cogumelo") {
			Destroy (objeto.gameObject);
			mini = false;
			anim.SetBool ("mini", mini);
			anim.Play ("MarioTransition");

		} else if (objeto.tag == "inimigo") {
			float dano= objeto.GetComponent<Inimigo>().dano;
			if(isAttack == true){
				life = life - (dano/2);
				Destroy (objeto.gameObject);
			}else if(isDefence == false){
				life = life - dano;
			}

		}
	}

}
