using UnityEngine;
using System.Collections;

public class MarioMovimentoRPG : MonoBehaviour {

	// Update is called once per frame
	void Update () {

        //tirando os elses é possivel ter um movimento diagonal
		if (Input.GetAxis ("Horizontal") > 0) {
			Andar ("direita");
		}
		if (Input.GetAxis ("Horizontal") < 0) {
			Andar ("esquerda");
		}

		if (Input.GetAxis ("Vertical") > 0) {
			Andar("cima");
		}

		if (Input.GetAxis ("Vertical") < 0) {
			Andar("baixo");
		}

		if (Input.GetKeyDown (KeyCode.Space)) {

			Pular();
		}

	}

	void Andar(string direcao){

		if (direcao == "direita") {
			transform.Translate (new Vector2 (3, 0) * Time.deltaTime);
			transform.eulerAngles = new Vector2 (0, 0);
		} else if (direcao == "esquerda") {
			transform.Translate (new Vector2 (3, 0) * Time.deltaTime);
			transform.eulerAngles = new Vector2 (0, 180);
		} else if (direcao == "cima") {
			transform.Translate (new Vector2 (0, 3) * Time.deltaTime);
		}else if (direcao == "baixo") {
			transform.Translate (new Vector2 (0, -3) * Time.deltaTime);
		}


	}


}