import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(titl: string, conten: string) {
    let postData: Post = { title: titl, content: conten };
    return this.http
      .post(
        'https://ng-complete-guide-76789-default-rtdb.firebaseio.com/posts.json',
        postData
      );
  }


  fetchPosts() {
    return this.http
      .get<{ key: string, Post }>(
        'https://ng-complete-guide-76789-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custome-Header': 'value required by server comes here'}),
          params: new HttpParams().set('print', 'pretty')
        }
        )
      .pipe(
        map(
          (posts) => {
            const res: Post[] = [];
            for (const key in posts) {
              //console.log( posts[key]);
              res.push({ ...posts[key], key });
            }
            //console.log(res)
            return res;
          }),
          catchError(errorRes => {
            //log errors in here
            return throwError(errorRes);
          })
      )
  }

  clearPosts() {
    return this.http.delete('https://ng-complete-guide-76789-default-rtdb.firebaseio.com/posts.json');
  }
}
