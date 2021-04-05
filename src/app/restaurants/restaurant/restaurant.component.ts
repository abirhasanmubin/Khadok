import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

import { Restaurant } from '../../models/restaurants';
import { Food } from 'src/app/models/food';
import { NgForm } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})

export class RestaurantComponent implements OnInit, AfterViewInit {


    restaurant: Restaurant;
    foodList: Food[];


    displayedColumns: string[] = ['name', 'price'];
    dataSource: MatTableDataSource<any>;


    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(
        public route: ActivatedRoute,
        public firebaseService: FirestoreService,
        public location: Location
    ) {
    }

    ngOnInit(): void {
        this.getRestaurant();
    }

    ngAfterViewInit() {
    }

    getRestaurant(): void {
        const id: string = this.route.snapshot.paramMap.get('id');
        this.firebaseService.getRestaurant(id).subscribe(restaurant => {
            this.restaurant = restaurant;
        })
        this.firebaseService.getRestaurantFoodList(id).subscribe(list => {
            this.dataSource = new MatTableDataSource(list);
            this.dataSource.paginator = this.paginator;
            this.foodList = list;
        })

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
