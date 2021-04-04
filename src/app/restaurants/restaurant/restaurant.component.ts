import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

import { Restaurant } from '../../models/restaurants';
@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {


    restaurant: Restaurant;
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
        let data = this.firebaseService.getRestaurant(id);
        console.log(data);

    }

    goBack(): void {
        this.location.back();
    }


}
