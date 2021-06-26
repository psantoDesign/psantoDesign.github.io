PaulSantoroWebsite.controller("about-me-controller", 
	["$scope", "$window",
	function AboutMeController($scope, $window) {

		$scope.windowWidth = 0;

		// Initializes the page.
		function initialize() {
			// Threshold for project column reorganization.
			$scope.oneColumnMaxWidth = 940;
			$scope.onWindowResize();
		}

		function setColumnView(targetColumns) {
			if (targetColumns === 1) {
				setOneColumnView();
			} else if (targetColumns === 2) {
				setTwoColumnView();
			}
		}

		// Sets the page view to show one column.  The project images are on the top and the description / images are on the bottom.
		function setOneColumnView() {
			console.log("Set one column view called");
			$scope.isTwoColumns = false;
		}

		// Sets the page view to show two columns, where the left column has the project thumbnail and the right column has the project info.
		function setTwoColumnView() {
			console.log("Set two column view called");
			$scope.isTwoColumns = true;
		}

		// Redirect.
		$scope.onClickNavigationButton = function (href) {
			$window.location.href = href;
		};

		// On resizing the window, determines how page data will be displayed.
		$scope.onWindowResize = function () {
			let previousWidth = $scope.windowWidth;
			let newWidth = $window.innerWidth;
			$scope.windowWidth = newWidth;

			// One-column view
			if (newWidth <= $scope.oneColumnMaxWidth && (previousWidth === 0 || previousWidth > $scope.oneColumnMaxWidth)) {  // Shrinking the window or initialization
				setColumnView(1);
				return;
			}

			// Two-column view
			if ((newWidth > $scope.oneColumnMaxWidth && previousWidth <= $scope.oneColumnMaxWidth && previousWidth !== 0)  // Growing the window
				|| (newWidth > $scope.oneColumnMaxWidth && previousWidth === 0)) {  // Initialization
				setColumnView(2);
				return;
			}
		};

		// Calls the onWindowResize function and digests the $scope.  This is necessary
		// to ensure the page is updated correctly when the window is resized manually
		// by the user.
		$scope.onWindowResizeDigest = function () {
			$scope.onWindowResize();
			$scope.$digest();
		};

		// Unbind the window resize function from the $window.
		function cleanUp() {
			angular.element($window).off('resize', $scope.onWindowResizeDigest);
		}

		// Bind the window resize function to the $window.
		angular.element($window).on('resize', $scope.onWindowResizeDigest);

		// Clean up the page.
		$scope.$on('$destroy', cleanUp);
	
		// Initialize the page.  This should only be done once all other functions have been declared.
		initialize();
}]);