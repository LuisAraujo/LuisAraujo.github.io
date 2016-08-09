using UnityEngine;
using System.Collections;

public class Fogo : MonoBehaviour {

	// Use this for initialization
	void Start () {

	}

	// Update is called once per frame
	void Update () {
		transform.Translate (new Vector2 (1, 0) * 4 * Time.deltaTime);
	}
}
