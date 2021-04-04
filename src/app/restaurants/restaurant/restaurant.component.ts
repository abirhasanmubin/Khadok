import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

import { Restaurant } from '../../models/restaurants';
import { Food } from 'src/app/models/food';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {


    restaurant: Restaurant;
    foodList: Food[];

    constructor(
        public route: ActivatedRoute,
        public firebaseService: FirestoreService,
        public location: Location
    ) { }

    ngOnInit(): void {
        this.getRestaurant();
    }

    getRestaurant(): void {
        const id: string = this.route.snapshot.paramMap.get('id');
        this.firebaseService.getRestaurant(id).subscribe(restaurant => {
            this.restaurant = restaurant;
        })
        this.firebaseService.getRestaurantFoodList(id).subscribe(list => {
            this.foodList = list;
        })
        console.log(this.foodList)
    }

    addFood(form: NgForm) {
        if (form.invalid) {
            return
        }
        const id: string = this.route.snapshot.paramMap.get('id');
        let data = { restaurantId: id, name: form.value.name, price: form.value.price };
        // console.log(data);
        this.firebaseService.addFood(data)
        form.reset();
    }

    goBack(): void {
        this.location.back();
    }


}
