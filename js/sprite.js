
(function() {
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0], this.size[1]);
        },
        pointDown: function() {
            this.pos[0] = 55;
        },
        pointUp: function() {
            this.pos[0] = 0;
        },
        pointLeft: function() {
            this.pos[0] = 165;
        },
        pointRight: function() {
            this.pos[0] = 110;
        },
        pointedAt: function() {
            switch(this.pos[0]) {
                case 55:
                direction = 'down'; break;
                case 0:
                direction = 'up'; break;
                case 165:
                direction = 'left'; break;
                case 110:
                direction = 'right'; break;
            }
            return direction;
        }
    };

    window.Sprite = Sprite;
})();