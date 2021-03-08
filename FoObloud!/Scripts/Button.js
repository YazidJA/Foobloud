//=================================================// OBJECT button
button = function () {
    this.font = gdi.Font("segoe ui", 10, 0);
    this.ButtonStates = {
        normal: 0,
        hover: 1,
        down: 2
    };

    var tmp;

    this.create = function (path_normal, path_hover, path_down, label_button, zorder) {
        if (typeof this.normal == "undefined") {
            this.normal = gdi.Image(path_normal);
            this.hover = gdi.Image(path_hover);
            this.down = gdi.Image(path_down);
            this.text = label_button;
            this.zorder = zorder;
            this.x = 0;
            this.y = 0;
            this.w = this.normal.Width;
            this.h = this.normal.Height;
            this.state = this.ButtonStates.normal;
            this.g_timer_counter = 0;
        } else {
            this.update(path_normal, path_hover, path_down, label_button, zorder);
        }
    }

    this.update = function (path_normal, path_hover, path_down, label_button, zorder) {
        this.normal = gdi.Image(path_normal);
        this.hover = gdi.Image(path_hover);
        this.down = gdi.Image(path_down);
        this.text = label_button;
        this.zorder = zorder;
    }

    this.ontimer = function (id) {
        if (this.g_timer) {
            switch (id) {
            case this.g_timer.ID:
                if (this.g_timer_sens == 1) {
                    this.g_timer_counter = (this.g_timer_counter < 10) ? this.g_timer_counter + 2 : this.g_timer_counter;
                    if (this.g_timer_counter == 10) this.g_timer && window.KillTimer(this.g_timer);
                } else {
                    this.g_timer_counter = (this.g_timer_counter > 0) ? this.g_timer_counter - 2 : 0;
                    if (this.g_timer_counter == 0) this.g_timer && window.KillTimer(this.g_timer);
                }
                window.RepaintRect(this.x, this.y, this.w + 1, this.h + 1);
                break;
            }
        }
    }

    this.draw = function (gr, bx, by, alpha, label) {
        this.x = bx;
        this.y = by;

        this.label_normal_colour = RGBA(200, 200, 200, 105 + this.g_timer_counter * 15);
        this.label_hover_colour = RGBA(225, 225, 225, 105 + this.g_timer_counter * 15);
        this.label_down_colour = RGBA(255, 055, 055, 105 + this.g_timer_counter * 15);

        switch (this.state) {
        case this.ButtonStates.normal:
            this.img_displayed = this.normal;
            this.label_colour = this.label_normal_colour;
            break;
        case this.ButtonStates.hover:
            this.img_displayed = this.hover;
            this.label_colour = this.label_hover_colour;
            break;
        case this.ButtonStates.down:
            this.img_displayed = this.down;
            this.label_colour = this.label_down_colour;
            break;
        }
        if(alpha==999)
        {
            gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 175 + this.g_timer_counter * 08);
        } else if(alpha==000){
            gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 255);           
        } else {
			gr.DrawImage(this.img_displayed, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h, 0, 115 + this.g_timer_counter * 14);  
		}
        if (label != "") {
            gr.SetTextRenderingHint(5);
            gr.DrawString(label, this.font, this.label_colour, bx + 7, by - 1, this.w - 9, this.h, l_stringformat);
        }
    }

    this.checkstate = function (event, x, y, id) {
        if (x > this.x && x < this.x + this.w - 1 && y > this.y && y < this.y + this.h - 1) {
            this.is_hover = true;
            this.mousecursor=32649;
        } else {
            this.is_hover = false;
            this.mousecursor=32512;
        }
        switch (event) {
        case "down":
            if (this.is_hover) {
                this.state = this.ButtonStates.down;
            } else if (this.state == this.ButtonStates.down) {
                this.state = this.ButtonStates.normal;
                this.g_timer && window.KillTimer(this.g_timer);
                this.g_timer_sens = 0;
                this.g_timer = window.CreateTimerInterval(40);
            }
            break;
        case "right":
            if (this.is_hover) {
                display_context_menu(x, y, id);
            }
            break;
        case "move":
            if (this.is_hover) {
                if (this.state != this.ButtonStates.down) {
                    if (this.state != this.ButtonStates.hover) {
                        this.g_timer_sens = 1;
                        this.g_timer && window.KillTimer(this.g_timer);
                        this.g_timer = window.CreateTimerInterval(40);
                        this.state = this.ButtonStates.hover;
                    }
                }
            } else if (this.state == this.ButtonStates.hover) {
                this.state = this.ButtonStates.normal;
                this.g_timer && window.KillTimer(this.g_timer);
                this.g_timer_sens = 0;
                this.g_timer = window.CreateTimerInterval(40);
            }
            break;
        case "up":
            if (this.is_hover) {
                if (this.state == this.ButtonStates.down) {
                    this.state = this.ButtonStates.hover;
                } else {
                    this.state = this.ButtonStates.normal;
                    this.g_timer && window.KillTimer(this.g_timer);
                    this.g_timer_sens = 0;
                    this.g_timer = window.CreateTimerInterval(40);
                }
            } else {
                this.state = this.ButtonStates.normal;
                this.g_timer && window.KillTimer(this.g_timer);
                this.g_timer_sens = 0;
                this.g_timer = window.CreateTimerInterval(40);
            }
            break;
        case "leave":
            this.state = this.ButtonStates.normal;
            this.g_timer && window.KillTimer(this.g_timer);
            this.g_timer_sens = 0;
            this.g_timer = window.CreateTimerInterval(40);
            break;
        }
        this.is_hover && window.RepaintRect(this.x, this.y, this.w + 1, this.h + 1);
        return this.state;
    }
}