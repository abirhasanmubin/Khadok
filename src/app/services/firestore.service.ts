import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/firestore'

import { Restaurant } from '../models/restaurants';
import { Food } from '../models/food';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService implements OnInit {


    restaurantsCollection: AngularFirestoreCollection<Restaurant>;
    restaurants: Observable<Restaurant[]>

    constructor(public db: AngularFirestore) {
        this.restaurantsCollection = db.collection<Restaurant>('restaurants');

        this.restaurants = this.restaurantsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Restaurant;
                    data.id = a.payload.doc.id;
                    return data;
                })
            })
        )
    };

    documentToDomainObject = _ => {
        const object = {};
        object['name'] = _.payload.doc.data().name;
        object['location'] = _.payload.doc.data().location;

        object['id'] = _.payload.doc.id;

        return object;
    }

    ngOnInit() {

    }

    getRestaurant(id: string) {
        let docu = this.db.collection<Restaurant>("restaurants").doc(id).get();
        return docu;
        //     return docu.get().pipe(
        //         map(a => {

        //                 const data = a.payload.doc.data() as Restaurant;
        //                 data.id = a.payload.doc.id;
        //                 return data;
        //         })
        //     )
        // }
    }
    addRestaurant(item: Restaurant) {
        return this.db.collection<Restaurant>('restaurants').doc().set(item);
    }

    updateRestaurant(id: string, name: string, location: string) {
        return this.db.collection<Restaurant>('restaurants').doc(id).set({
            name: name,
            location: location
        });
    }

    deleteRestaurant(id: string) {
        return this.db.collection<Restaurant>('restaurants').doc(id).delete();
    }

    getRestaurants() {
        return this.restaurants;
    }

    ngOnDestroy() {

    }



}
