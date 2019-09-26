//
//  #assignment1(week 1).c
//  
//
//  Created by TSAR on 26/09/2019.
//

#include "#assignment1(week 1).h"
#include <stdio.h>
int main() {
    int i;
    int num = 6; int product = 1;
    for (i = 1; i <= num; i++) product *= i;
    printf("Factorial of %d is %d\n", num, product);
}
