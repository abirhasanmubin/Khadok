import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Restaurant } from '../models/restaurants';

import { FirestoreService } from '../services/firestore.service';

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

    constructor(public firestoreService: FirestoreService) { }

    ngOnInit(): void {
        this.firestoreService.getRestaurants().subscribe(restaurants => {
            //console.log(items);
            this.restaurants = restaurants;
        });
    }


    data: Restaurant;
    restaurants: Restaurant[] = [];

    onSubmit(form: NgForm) {
        // alert("Submitted");
        if (form.invalid) {
            return
        }
        this.data = { name: form.value.name, location: form.value.location };
        console.log(this.data);
        this.firestoreService.addRestaurant(this.data)
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err.message);
            });
        form.resetForm();
    }


}
