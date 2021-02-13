PaulSantoroWebsite.controller("illustration-controller", 
	["$scope", 
	function IllustrationController($scope) {

		// Initializes the page.
		function initialize() {

			// Enter the images in the order you want to view them.
			let workflowImages = [
				"../Resources/photoshop_alien_illustration_img.png",
				"../Resources/photoshop_robot_illustration_img.png",
				"../Resources/photoshop_planet_illustration_img.png",
				"../Resources/illustrator_trophy_illustration_img.png"
			];

			// Make it so that the images can be viewed.  Don't modify this part of the code.
			$scope.workflowImageView = [];

			// TODO constant image carousel height?
			for (let i = 0; i < workflowImages.length; i++) {
				$scope.workflowImageView.push({
					alt: "Slide " + i,
					carouselIndicatorClass: i === 0 ? "active" : "",
					carouselInnerClass: i === 0 ? "carousel-item active" : "carousel-item",
					index: i,
					src: workflowImages[i]
				});
			}

			console.log($scope.workflowImageView);
		}
	
		// Initialize the page.  This should only be done once all other functions have been declared.
		initialize();
}]);