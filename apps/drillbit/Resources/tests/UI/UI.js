describe("UI Module Tests",{
	test_ui_module_methods: function()
	{
		value_of(Titanium.UI.addTray).should_be_function();
		value_of(Titanium.UI.clearTray).should_be_function();
		value_of(Titanium.UI.createMenu).should_be_function();
		value_of(Titanium.UI.getContextMenu).should_be_function();
		value_of(Titanium.UI.getIdleTime).should_be_function();
		value_of(Titanium.UI.getMenu).should_be_function();
		value_of(Titanium.UI.mainWindow).should_be_object();
		value_of(Titanium.UI.setContextMenu).should_be_function();
		value_of(Titanium.UI.setDockIcon).should_be_function();
		value_of(Titanium.UI.setDockMenu).should_be_function();
		value_of(Titanium.UI.setIcon).should_be_function();
		value_of(Titanium.UI.setMenu).should_be_function();
		value_of(Titanium.UI.setBadge).should_be_function();
		value_of(Titanium.UI.setBadgeImage).should_be_function();
	},
	test_windows_array: function()
	{
		value_of(Titanium.UI.getOpenWindows()).should_be_object();
		value_of(Titanium.UI.getOpenWindows().length).should_be(1);

		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(Titanium.UI.getOpenWindows().length).should_be(1);
		w.open();
		value_of(Titanium.UI.getOpenWindows().length).should_be(2);
		value_of(Titanium.UI.getCurrentWindow().equals(w.getParent())).should_be_true();

		var w2 = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(Titanium.UI.getOpenWindows().length).should_be(2);
		w2.open();
		value_of(Titanium.UI.getOpenWindows().length).should_be(3);
		value_of(Titanium.UI.getCurrentWindow().equals(w2.getParent())).should_be_true();
		value_of(w2.getParent().equals(w.getParent())).should_be_true();
		value_of(w2 != w).should_be_true();
	},
	test_window_max_size: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.setHeight(700);
		w.setWidth(700);

		value_of(w.getHeight()).should_be(700);
		value_of(w.getWidth()).should_be(700);

		w.setMaxHeight(500);
		value_of(w.getHeight()).should_be(500);

		w.setMaxWidth(400);
		value_of(w.getWidth()).should_be(400);

		w.setHeight(700);
		w.setWidth(700);
		value_of(w.getHeight()).should_be(500);
		value_of(w.getWidth()).should_be(400);

		w.setMaxWidth(-1);
		w.setMaxHeight(-1);
		w.setHeight(700);
		w.setWidth(700);

		w.open();

		value_of(w.getHeight()).should_be(700);
		value_of(w.getWidth()).should_be(700);

		w.setMaxHeight(500);
		value_of(w.getHeight()).should_be(500);

		w.setMaxWidth(400);
		value_of(w.getWidth()).should_be(400);

		w.setHeight(700);
		w.setWidth(700);
		value_of(w.getHeight()).should_be(500);
		value_of(w.getWidth()).should_be(400);

		value_of(w.getMaxHeight()).should_be(500);
		value_of(w.getMaxWidth()).should_be(400);
		
		w.close();
	},
	test_window_min_size: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.setHeight(100);
		w.setWidth(100);

		value_of(w.getHeight()).should_be(100);
		value_of(w.getWidth()).should_be(100);

		w.setMinHeight(500);
		value_of(w.getHeight()).should_be(500);

		w.setMinWidth(400);
		value_of(w.getWidth()).should_be(400);

		w.setHeight(100);
		w.setWidth(100);
		value_of(w.getHeight()).should_be(500);
		value_of(w.getWidth()).should_be(400);

		w.setMinWidth(-1);
		w.setMinHeight(-1);
		w.setHeight(100);
		w.setWidth(130);

		w.open();
		
		// for some reason, the lowest value i can get out of win32 is 116px width.. 
		// webkit might be constraining the minimum width of it's content area, not sure
		// for now use 125 instead of 100 for width
		value_of(w.getHeight()).should_be(100);
		value_of(w.getWidth()).should_be(130);
		

		w.setMinHeight(500);
		value_of(w.getHeight()).should_be(500);

		w.setMinWidth(400);
		value_of(w.getWidth()).should_be(400);

		w.setHeight(100);
		w.setWidth(100);
		value_of(w.getHeight()).should_be(500);
		value_of(w.getWidth()).should_be(400);

		value_of(w.getMinHeight()).should_be(500);
		value_of(w.getMinWidth()).should_be(400);

		w.close();
	},
	test_window_set_height: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.setHeight(100);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(200);
		value_of(w.getHeight()).should_be(200);
		w.setHeight(100);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(10000);
		value_of(w.getHeight()).should_be(10000);
		w.setHeight(100);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(-1);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(0);
		value_of(w.getHeight()).should_be(100);
		w.open();
		w.setHeight(100);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(200);
		value_of(w.getHeight()).should_be(200);
		w.setHeight(100);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(10000);
		value_of(w.getHeight()).should_be(10000);
		w.setHeight(100);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(-1);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(-666);
		value_of(w.getHeight()).should_be(100);
		w.setHeight(0);
		value_of(w.getHeight()).should_be(100);
	},
	test_window_set_width: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.setWidth(100);
		value_of(w.getWidth()).should_be(100);
		w.setWidth(200);
		value_of(w.getWidth()).should_be(200);
		w.setWidth(100);
		value_of(w.getWidth()).should_be(100);
		w.setWidth(10000);
		value_of(w.getWidth()).should_be(10000);
		w.setWidth(100);
		value_of(w.getWidth()).should_be(100);
		w.setWidth(-1);
		value_of(w.getWidth()).should_be(100);
		w.setWidth(0);
		value_of(w.getWidth()).should_be(100);
		w.open()
		w.setWidth(130);
		value_of(w.getWidth()).should_be(130);
		w.setWidth(200);
		value_of(w.getWidth()).should_be(200);
		w.setWidth(130);
		value_of(w.getWidth()).should_be(130);
		w.setWidth(10000);
		value_of(w.getWidth()).should_be(10000);
		w.setWidth(130);
		value_of(w.getWidth()).should_be(130);
		w.setWidth(-1);
		value_of(w.getWidth()).should_be(130);
		w.setWidth(-666);
		value_of(w.getWidth()).should_be(130);
		w.setWidth(0);
		value_of(w.getWidth()).should_be(130);
	},
	test_window_set_closeable: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'http://blahblah.html', closeable: false});
		value_of(w.isCloseable()).should_be_false();
		w.setCloseable(true);
		value_of(w.isCloseable()).should_be_true();
		w.open();
		value_of(w.isCloseable()).should_be_true();
		w.setCloseable(false);
		value_of(w.isCloseable()).should_be_false();
		w.setCloseable(true);
		value_of(w.isCloseable()).should_be_true();
	},
	test_window_set_minimizable: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', minimizable: false});
		value_of(w.isMinimizable()).should_be_false();
		w.setMinimizable(true);
		value_of(w.isMinimizable()).should_be_true();
		w.open();
		value_of(w.isMinimizable()).should_be_true();
		w.setMinimizable(false);
		value_of(w.isMinimizable()).should_be_false();
		w.setMinimizable(true);
		value_of(w.isMinimizable()).should_be_true();
	},
	test_window_set_maximizable: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', maximizable: false});
		value_of(w.isMaximizable()).should_be_false();
		w.setMaximizable(true);
		value_of(w.isMaximizable()).should_be_true();
		w.open();
		value_of(w.isMaximizable()).should_be_true();
		w.setMaximizable(false);
		value_of(w.isMaximizable()).should_be_false();
		w.setMaximizable(true);
		value_of(w.isMaximizable()).should_be_true();
	},
	test_window_set_using_chrome: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', usingChrome: false});
		value_of(w.isUsingChrome()).should_be_false();
		w.setUsingChrome(true);
		value_of(w.isUsingChrome()).should_be_true();
		w.open();
		value_of(w.isUsingChrome()).should_be_true();
		w.setUsingChrome(false);
		value_of(w.isUsingChrome()).should_be_false();
		w.setUsingChrome(true);
		value_of(w.isUsingChrome()).should_be_true();
	},
	test_window_visibility: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', visible: false});
		value_of(w.isVisible()).should_be_false();
		w.open();
		value_of(w.isVisible()).should_be_false();
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', visible: true});
		value_of(w.isVisible()).should_be_false();
		w.setVisible(true);
		value_of(w.isVisible()).should_be_false();
		w.open();
		value_of(w.isVisible()).should_be_true();

		w.setVisible(false);
		value_of(w.isVisible()).should_be_false();

		w.show();
		value_of(w.isVisible()).should_be_true();
		w.hide();
		value_of(w.isVisible()).should_be_false();
	},
	test_window_location: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', x: 100, y:200});
		value_of(w.getX()).should_be(100);
		value_of(w.getY()).should_be(200);

		w.setX(400);
		w.setY(300);
		value_of(w.getX()).should_be(400);
		value_of(w.getY()).should_be(300);

		w.open();
		value_of(w.getX()).should_be(400);
		value_of(w.getY()).should_be(300);

		w.setX(101);
		w.setY(153);
		value_of(w.getX()).should_be(101);
		value_of(w.getY()).should_be(153);

		w.setX(-1);
		w.setY(-2);
		value_of(w.getX()).should_be(-1);
		value_of(w.getY()).should_be(-2);

		w.setX(-666);
		w.setY(-333);
		value_of(w.getX()).should_be(-666);
		value_of(w.getY()).should_be(-333);
	},
	test_offscreen_window_locations: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', x: 100, y:200});
		value_of(w.getX()).should_be(100);
		value_of(w.getY()).should_be(200);

		w.setX(-1);
		w.setY(-2);
		value_of(w.getX()).should_be(-1);
		value_of(w.getY()).should_be(-2);

		w.setX(-666);
		w.setY(-333);
		value_of(w.getX()).should_be(-666);
		value_of(w.getY()).should_be(-333);

		// Take it to the max! Yeah!
		w.setX(-10000);
		w.setY(-10001);
		value_of(w.getX()).should_be(-10000);
		value_of(w.getY()).should_be(-10001);

		w.setX(100000);
		w.setY(200000);
		value_of(w.getX()).should_be(100000);
		value_of(w.getY()).should_be(200000);

		w.setX(-666);
		w.setY(-333);
		value_of(w.getX()).should_be(-666);
		value_of(w.getY()).should_be(-333);

		w.open();
		value_of(w.getX()).should_be(-666);
		value_of(w.getY()).should_be(-333);

		// Take it to the max! Yeah! Yeah!
		w.setX(-10000);
		w.setY(-10001);
		value_of(w.getX()).should_be(-10000);
		value_of(w.getY()).should_be(-10001);

		
		// max positive location in win32 (after being opened) is 32767x32767
		w.setX(100000);
		w.setY(200000);
		
		if (Titanium.platform != "win32") {
			value_of(w.getX()).should_be(100000);
			value_of(w.getY()).should_be(200000);
		}
		else {
			value_of(w.getX()).should_be(32767);
			value_of(w.getY()).should_be(32767);
		}
	},
	test_window_bounds: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({
			url: 'app://blahblah.html',
			width: 444,
			height: 333,
			x: 100,
			y: 200});
		value_of(w.getX()).should_be(100);
		value_of(w.getY()).should_be(200);
		value_of(w.getWidth()).should_be(444);
		value_of(w.getHeight()).should_be(333);

		var b = w.getBounds();
		value_of(b.x).should_be(100);
		value_of(b.y).should_be(200);
		value_of(b.width).should_be(444);
		value_of(b.height).should_be(333);

		b.x = 444;
		b.y = 222;
		b.width = 500;
		b.height = 200;
		w.setBounds(b);

		var b = w.getBounds();
		value_of(b.x).should_be(444);
		value_of(b.y).should_be(222);
		value_of(b.width).should_be(500);
		value_of(b.height).should_be(200);
		value_of(w.getX()).should_be(444);
		value_of(w.getY()).should_be(222);
		value_of(w.getWidth()).should_be(500);
		value_of(w.getHeight()).should_be(200);

		w.setWidth(444);
		w.setHeight(333);
		w.setX(100);
		w.setY(200);
		w.open();

		value_of(w.getX()).should_be(100);
		value_of(w.getY()).should_be(200);
		value_of(w.getWidth()).should_be(444);
		value_of(w.getHeight()).should_be(333);

		var b = w.getBounds();
		value_of(b.x).should_be(100);
		value_of(b.y).should_be(200);
		value_of(b.width).should_be(444);
		value_of(b.height).should_be(333);

		b.x = 444;
		b.y = 222;
		b.width = 500;
		b.height = 200;
		w.setBounds(b);

		var b = w.getBounds();
		value_of(b.x).should_be(444);
		value_of(b.y).should_be(222);
		value_of(b.width).should_be(500);
		value_of(b.height).should_be(200);
		value_of(w.getX()).should_be(444);
		value_of(w.getY()).should_be(222);
		value_of(w.getWidth()).should_be(500);
		value_of(w.getHeight()).should_be(200);
	},
	test_window_maximize: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', maximized: true});
		value_of(w.isMaximized()).should_be(true);
		w.open();
		value_of(w.isMaximized()).should_be(true);
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', maximized: false});
		value_of(w.isMaximized()).should_be(false);
		w.open();
		value_of(w.isMaximized()).should_be(false);
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(w.isMaximized()).should_be(false);
		w.maximize();
		value_of(w.isMaximized()).should_be(true);
		w.open();
		value_of(w.isMaximized()).should_be(true);
		w.unmaximize();
		value_of(w.isMaximized()).should_be(false);
		w.maximize();
		value_of(w.isMaximized()).should_be(true);
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(w.isMaximized()).should_be(false);
		w.maximize();
		value_of(w.isMaximized()).should_be(true);
		w.unmaximize();
		value_of(w.isMaximized()).should_be(false);
		w.open();
		value_of(w.isMaximized()).should_be(false);
		w.maximize();
		value_of(w.isMaximized()).should_be(true);
		w.unmaximize();
		value_of(w.isMaximized()).should_be(false);
		w.close();
	},
	test_window_minimize: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', minimized: true});
		value_of(w.isMinimized()).should_be(true);
		w.open();
		value_of(w.isMinimized()).should_be(true);
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow({url: 'app://blahblah.html', minimized: false});
		value_of(w.isMinimized()).should_be(false);
		w.open();
		value_of(w.isMinimized()).should_be(false);
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(w.isMinimized()).should_be(false);
		w.minimize();
		value_of(w.isMinimized()).should_be(true);
		w.open();
		value_of(w.isMinimized()).should_be(true);
		w.unminimize();
		value_of(w.isMinimized()).should_be(false);
		w.minimize();
		value_of(w.isMinimized()).should_be(true);
		w.close();

		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(w.isMinimized()).should_be(false);
		w.minimize();
		value_of(w.isMinimized()).should_be(true);
		w.unminimize();
		value_of(w.isMinimized()).should_be(false);
		w.open();
		value_of(w.isMinimized()).should_be(false);
		w.minimize();
		value_of(w.isMinimized()).should_be(true);
		w.unminimize();
		value_of(w.isMinimized()).should_be(false);
		w.close();
	},
	test_multi_open_as_async: function(callback)
	{
		var count = 5;
		var w = null;;
		function closeBlimpWindow()
		{
			w.close();
			setTimeout(function() { openBlimpWindow(); }, 200);
		}
		function openBlimpWindow()
		{
			if (count == 0)
			{
				callback.passed();
			}
			else
			{
				count = count - 1;
				w = Titanium.UI.getCurrentWindow().createWindow('app://multi_open.html');
				w.open();
				setTimeout(function() { closeBlimpWindow(); }, 200);
			}
		}
		openBlimpWindow();
	},
	test_title_override_as_async: function(callback)
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://multi_open.html');
		var w2 = Titanium.UI.getCurrentWindow().createWindow('app://multi_open.html');
		w.setTitle("Set!");
		w.open();
		w2.open();

		setTimeout(function()
		{
			if (w.getTitle() != "Set!") {
				w.close();
				callback.failed("Set title did not override header title");
			} else {
				w.close();
				callback.passed();
			}
			if (w2.getTitle() != Titanium.API.getApplication().getName()) {
				w.close();
				callback.failed("Set title did not override header title 2");
			} else {
				w.close();
				callback.passed();
			}
		}, 1000);
	},
	test_close_message_on_originating_window_as_async: function(callback)
	{
		Titanium.saw_close = false;
		Titanium.saw_closed = false;

		var w = Titanium.UI.getCurrentWindow().createWindow('app://test_close_event_listener.html');
		w.open();

		setTimeout(function() {
			w.close();
			setTimeout(function() {
				if (Titanium.API.saw_close) {
					callback.passed();
				} else {
					callback.failed("Closing window did not receive CLOSE event");
				}
			}, 200);
		}, 200);
	},
	test_window_top_most: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		
		w.open();
		value_of(w.isTopMost()).should_be(false);

		w.setTopMost(true);
		value_of(w.isTopMost()).should_be(true);

		w.setTopMost(false);
		value_of(w.isTopMost()).should_be(false);

		w.minimize();
		value_of(w.isMinimized()).should_be(true);
		value_of(w.isTopMost()).should_be(false);
		w.unminimize();

		w.setVisible(false);
		value_of(w.isVisible()).should_be_false();
		value_of(w.isTopMost()).should_be(false);

		w.show();
		value_of(w.isVisible()).should_be_true();
		value_of(w.isTopMost()).should_be(false);
		w.hide();
		value_of(w.isVisible()).should_be_false();
		value_of(w.isTopMost()).should_be(false);

		w.close();
	},
	
	test_window_resizable: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		value_of(w.isResizable()).should_be(true);
		w.open();

		value_of(w.isResizable()).should_be(true);

		w.setResizable(false);
		value_of(w.isResizable()).should_be(false);

		w.setResizable(true);
		value_of(w.isResizable()).should_be(true);

		w.close();
	},

	test_window_focus_as_async: function(callback)
	{
		var hasFocus = false;
		// get the current UserWindow object
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		var w2 = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.open();
		w2.open();

		w.addEventListener(Titanium.FOCUSED, function(event)
		{
			if (event.type == Titanium.FOCUSED)
			{
				hasFocus = true;
			}
		});
		w.focus();

		setTimeout(function()
		{
			w.close();
			w2.close();
			if (!hasFocus)
			{
				callback.failed("Did not detect maximized message");
			}
			callback.passed();
		}, 300);
	},

	test_window_unfocus_as_async: function(callback)
	{
		var hadFocus = false;
		// get the current UserWindow object
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		var w2 = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.open();
		w2.open();
		
		// just make sure we have the focus...
		w2.focus();

		// basically the same test as before, but we add the event listener to
		// the second window and wait for the unfocus event.
		w2.addEventListener(Titanium.UNFOCUSED, function(event)
		{
			if (event.type == Titanium.UNFOCUSED)
			{
				hadFocus = true;
			}
		});
		w2.unfocus();

		setTimeout(function()
		{
			w.close();
			w2.close();
			if (!hadFocus)
			{
				callback.failed("Did not detect maximized message");
			}
			callback.passed();
		}, 300);
	},
	
	test_window_transparency: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.open();
		
		var alphaBlend = w.getTransparency();
		
		value_of(alphaBlend).should_be_number();
		
		// transparency is constrained to a value between 0.0 <-> 1.0
		// upper limits
		w.setTransparency(10.0);
		value_of(w.getTransparency()).should_be(1.0);
		
		// lower limits
		w.setTransparency(-10.0);
		value_of(w.getTransparency()).should_be(0.0);

		// somewhere in between
		w.setTransparency(0.5);
		value_of(w.getTransparency()).should_be(0.5);

		value_of(w.getTransparencyColor()).should_be_string();
		
		w.close();
	},
	test_window_mainWnd_by_ID: function()
	{
		var currentWnd = Titanium.UI.getCurrentWindow();
		var mainWnd = Titanium.UI.getMainWindow();
		value_of(mainWnd.getID() == currentWnd.getID()).should_be_true();

		var w = currentWnd.createWindow('app://blahblah.html');
		w.open();

		value_of(mainWnd == w).should_be_false();
		value_of(currentWnd.getID() == w.getID()).should_be_false();
		
		var whosUrDaddy = w.getParent();
		value_of(mainWnd.getID() == whosUrDaddy.getID()).should_be_true();
		
		w.close();
	},
	test_window_icon: function()
	{
		var w = Titanium.UI.getCurrentWindow().createWindow('app://blahblah.html');
		w.open();

		// I expect that there is no icon defined for the test.
		if (w.getIcon() != null)
		{
			// if there is, then it should be returned as a string.
			value_of(w.getIcon()).should_be_string();
		}

		// setup a dummy icon
		w.setIcon("doesnotexist.png");
		value_of(w.getIcon()).should_be("doesnotexist.png");

		w.close();
	}
});
