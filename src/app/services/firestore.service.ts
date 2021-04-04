import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Restaurant } from '../models/restaurants';
import { Food } from '../models/food';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService implements OnInit {


    foodCollection: AngularFirestoreCollection<Food>;
    restaurantsCollection: AngularFirestoreCollection<Restaurant>;

    restaurantFoodList: Observable<Food[]>;

    foodList: Observable<Food[]>;
    restaurants: Observable<Restaurant[]>;
    restaurant: Observable<Restaurant>;

    constructor(public db: AngularFirestore) {
        this.restaurantsCollection = db.collection<Restaurant>('restaurants');
        this.foodCollection = db.collection<Food>('foods');

        this.restaurants = this.restaurantsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Restaurant;
                    data.id = a.payload.doc.id;
                    return data;
                })
            })
        )
        this.foodList = this.foodCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Food;
                    data.id = a.payload.doc.id;
                    return data;
                })
            })
        )
    };


    ngOnInit() {

    }

    getRestaurant(id: string) {
        this.restaurant = this.db.doc('restaurants/' + id).snapshotChanges()
            .pipe(map(action => {
                const dota = action.payload.data() as Restaurant;
                dota['id'] = action.payload.id;
                return dota;
            }));
        return this.restaurant;
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

    addFood(item: Food) {
        this.db.collection<Food>('foods').doc().set(item);
    }

    getFoodList() {
        return this.foodList;
    }

    getRestaurantFoodList(id: string) {
        this.restaurantFoodList = this.db.collection('foods', ref => ref.where("restaurantId", "==", id))
            .snapshotChanges().pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Food;
                        data.id = a.payload.doc.id;
                        return data;
                    })
                })
            )
        return this.restaurantFoodList;
    }

    ngOnDestroy() {

    }



}
