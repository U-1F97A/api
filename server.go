package main

import (
	"fmt"
	"html"
	"net/http"
)

// https://go-example.glitch.me/
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello Go!")
}

// https://go-example.glitch.me/love/Go
func love(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", html.EscapeString(r.URL.Path[6:]))
}

// https://go-example.glitch.me/hacking
func hacking(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hacking away on Go on Glitch.")
}

func main() {
	http.HandleFunc("/hacking", hacking)
	http.HandleFunc("/love/", love)
	http.HandleFunc("/", handler)
	http.ListenAndServe(":3000", nil)
}
