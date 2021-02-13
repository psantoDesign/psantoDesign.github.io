// Define the "index-controller" controller on the "PaulSantoroWebsite" module
PaulSantoroWebsite.controller("index-controller", 
	["$scope", "$window", 
	function IndexController($scope, $window) {
	
	$scope.userView = {
		projectRows: [],
		windowWidth: 0
	};
	
	// Initializes the page.
	function initialize() {
		
		// Modify this object to modify the home page contents.
		$scope.projects = [
			{
				title: "Low Poly Stone",
				imageAltText: "Low Poly Stone",
				imageSource: "Resources/stone_thumbnail_img.png",
				page: "Projects/stone.html"
			},
			{
				title: "Happy Bot Animation",
				imageAltText: "Happy Bot Animation",
				imageSource: "Resources/robot_animation_thumbnail.png",
				page: "Projects/robot.html"
			}
		];
		
		// Sort by title for now.
		$scope.projects = _.sortBy($scope.projects, function (elem) { return elem.title });
		
		// Thresholds for project column reorganization.
		$scope.oneColumnMaxWidth = 600;
		$scope.twoColumnsMaxWidth = 900;
		
		$scope.onWindowResize();
	}

	function setColumnView(targetColumns) {
		if (targetColumns === 1) {
			setOneColumnView();
		} else if (targetColumns === 2) {
			if ($scope.projects.length === 1) {
				setOneColumnView();
			} else {
				setTwoColumnView();
			}
		} else {
			if ($scope.projects.length === 1) {
				setOneColumnView();
			} else if ($scope.projects.length === 2) {
				setTwoColumnView();
			} else {
				setThreeColumnView();
			}
        }
    }

	// Sets the page view to show one column of projects.
	function setOneColumnView() {
		console.log("Set one column view called");
		
		$scope.userView.projectRows = [];
		for (let i = 0; i < $scope.projects.length; i++) {
			$scope.userView.projectRows.push([{
				columnType: "col-12",
				project: $scope.projects[i]
			}]);
		}
		
		console.log("User View:  ", $scope.userView);
	}
	
	// Sets the page view to show two columns of projects.
	function setTwoColumnView() {
		console.log("Set two column view called");
		
		$scope.userView.projectRows = [];
		for (let i = 0; i < $scope.projects.length; i += 2) {
			let tmp = [];
			tmp.push({
				columnType: "col-6",
				project: $scope.projects[i]
			});
			if (i + 1 < $scope.projects.length) {
					tmp.push({
					columnType: "col-6",
					project: $scope.projects[i + 1]
				});
			}
			$scope.userView.projectRows.push(tmp);
		}
		
		console.log("User View:  ", $scope.userView);
	}
	
	// Sets the page view to show three columns of projects.
	function setThreeColumnView() {
		console.log("Set three column view called");
		
		$scope.userView.projectRows = [];
		for (let i = 0; i < $scope.projects.length; i += 3) {
			let tmp = [];
			tmp.push({
				columnType: "col-4",
				project: $scope.projects[i]
			});
			if (i + 1 < $scope.projects.length) {
					tmp.push({
					columnType: "col-4",
					project: $scope.projects[i + 1]
				});
			}
			if (i + 2 < $scope.projects.length) {
					tmp.push({
					columnType: "col-4",
					project: $scope.projects[i + 2]
				});
			}
			$scope.userView.projectRows.push(tmp);
		}
		
		console.log("User View:  ", $scope.userView);
	}
	
	// On resizing the window, determines how page data will be displayed.
	$scope.onWindowResize = function () {
		let previousWidth = $scope.userView.windowWidth;
		let newWidth = $window.innerWidth;
		$scope.userView.windowWidth = newWidth;
		
		// One-column view
		if (newWidth <= $scope.oneColumnMaxWidth && (previousWidth === 0 || previousWidth > $scope.oneColumnMaxWidth)) {  // Shrinking the window or initialization
			setColumnView(1);
			return;
		}
		
		// Two-column view
		if ((newWidth <= $scope.twoColumnsMaxWidth && previousWidth > $scope.twoColumnsMaxWidth && previousWidth !== 0)  // Shrinking the window
			|| (newWidth > $scope.oneColumnMaxWidth && previousWidth <= $scope.oneColumnMaxWidth && previousWidth !== 0)  // Growing the window
			|| (newWidth > $scope.oneColumnMaxWidth && newWidth <= $scope.twoColumnsMaxWidth && previousWidth === 0)) {  // Initialization
			setColumnView(2);
			return;
		}
		
		// Three-column view
		if (newWidth > $scope.twoColumnsMaxWidth && (previousWidth === 0 || previousWidth <= $scope.twoColumnsMaxWidth)) {  // Growing the window or initialization
			setColumnView(3);
			return;
		}
	}
	
	// Calls the onWindowResize function and digests the $scope.  This is necessary
	// to ensure the page is updated correctly when the window is resized manually
	// by the user.
	$scope.onWindowResizeDigest = function () {
		$scope.onWindowResize();
		$scope.$digest();
	}
	
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