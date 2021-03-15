import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostsService } from './posts.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;
  error = null;

  constructor(private http: HttpClient, private postsSer: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.fetchPosts()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsSer.createAndStorePost(postData.title, postData.content)
      .subscribe((response) => {
      //console.log(response);
      this.fetchPosts();
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postsSer.fetchPosts()
      .subscribe((response) => {
        this.isLoading = false;
        this.loadedPosts = response;
      }, err => {
        this.error = err.error.error;
      })
  };


  onClearPosts() {
    // Send Http request
    this.postsSer.clearPosts().subscribe(()=> {
      //console.log('Posts deleted')
      this.loadedPosts = [];
    })
  }
}
