input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    motobit.enable(MotorPower.On)
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100)
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100)
    on = true
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    pins.servoWritePin(AnalogPin.P15, 90)
    pause(100)
    motobit.enable(MotorPower.Off)
    led.unplot(0, 0)
    on = false
})
let rotation = 1
function turn_left(angle: number, rotation: number) {
    
    
    
    
    if (on) {
        if (!manouvering) {
            while (distance < 3500) {
                pins.servoWritePin(AnalogPin.P16, angle)
                angle += rotation
                if (angle > 120) {
                    rotation = -1
                } else if (angle < 90) {
                    // here cannot go right! (look at)
                    rotation = 1
                }
                
                basic.clearScreen()
                serial.writeValue("in the cycle", distance)
                led.unplot(0, 0)
                // not to forget to update distance in the while
                distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MicroSeconds)
                if (distance > 3000) {
                    angle += rotation * -1
                }
                
                manouvering = true
                motobit.enable(MotorPower.On)
                led.plot(2, 2)
                if (distance < 1500 && angle < 120) {
                    // led.plot(4,4)
                    led.plot(2, 1)
                    led.plot(2, 3)
                    led.plot(1, 2)
                    led.plot(3, 2)
                    // again same problem
                    motobit.enable(MotorPower.Off)
                    pins.servoWritePin(AnalogPin.P15, 160)
                    pause(300)
                    motobit.enable(MotorPower.On)
                    motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 100)
                    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 100)
                    pause(1000)
                    //  pins.servo_write_pin(AnalogPin.P15, 37)
                    //  motobit.set_motor_speed(Motor.LEFT, MotorDirection.FORWARD, 60)
                    //  motobit.set_motor_speed(Motor.RIGHT, MotorDirection.FORWARD, 60)
                    //  pause(1000)
                    led.unplot(2, 2)
                    led.unplot(2, 1)
                    led.unplot(2, 3)
                    led.unplot(1, 2)
                    led.unplot(3, 2)
                } else {
                    // led.unplot(4,4)
                    // manouvering = False
                    led.plot(2, 2)
                    // to avoid turning while going forward
                    // motobit.enable(MotorPower.OFF)
                    pins.servoWritePin(AnalogPin.P15, 30)
                    // pause(300)
                    // motobit.enable(MotorPower.ON)
                    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 70)
                    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 70)
                    pause(350)
                    led.unplot(2, 2)
                }
                
            }
            // #manouvering2 = False
            motobit.enable(MotorPower.Off)
            pins.servoWritePin(AnalogPin.P15, 90)
            motobit.enable(MotorPower.On)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100)
            //  motobit.set_motor_speed(Motor.LEFT, MotorDirection.FORWARD, 50)
            basic.clearScreen()
            // not to forget to update manouvering
            manouvering = false
            pause(5)
        }
        
    }
    
    
}

let on = false
let manouvering = false
//  TURN LEFT: pins.servo_write_pin(AnalogPin.P15, 37)
//  TURN RIGHT: pins.servo_write_pin(AnalogPin.P15, 160)
//  neutral: pins.servo_write_pin(AnalogPin.P15, 90)
motobit.invert(Motor.Left, true)
motobit.invert(Motor.Right, true)
motobit.enable(MotorPower.Off)
let distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MicroSeconds)
serial.writeValue("distance", distance)
//  serial.writeNumber(sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MICRO_SECONDS));
// try building another forever loop?
basic.forever(function on_forever() {
    let angle: number;
    motobit.invert(Motor.Left, true)
    motobit.invert(Motor.Right, true)
    
    
    
    
    on = true
    distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MicroSeconds)
    led.plot(0, 0)
    //  serial.write_number(distance)
    serial.writeValue("distance", distance)
    serial.writeLine("" + ("" + on))
    serial.writeLine("" + ("" + manouvering))
    for (angle = 30; angle < 150; angle++) {
        pins.servoWritePin(AnalogPin.P16, angle)
        distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MicroSeconds)
        pause(5)
        turn_left(angle, rotation)
    }
    for (angle = 150; angle > 30; angle += -1) {
        pins.servoWritePin(AnalogPin.P16, angle)
        distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MicroSeconds)
        pause(5)
        turn_left(angle, rotation)
    }
})
/** 

def on_button_pressed_a():
    pass

input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    pass

input.on_button_pressed(Button.B, on_button_pressed_b)

distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MICRO_SECONDS)

#try building another forever loop?
def on_forever():
    global distance
    distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MICRO_SECONDS)
    led.unplot(0, 0)
    motobit.invert(Motor.LEFT, True)
    motobit.invert(Motor.RIGHT, True)
    for angle in range(30, 150):
        pins.servo_write_pin(AnalogPin.P16, angle)
        distance = sonar.ping(DigitalPin.P12, DigitalPin.P14, PingUnit.MICRO_SECONDS)
        #if angle == 150:
            #led.plot(0, 0)
        pause(5)
    for angle in range(150, 30, -1):
            pins.servo_write_pin(AnalogPin.P16, angle)
            #if angle == 270:
                #led.plot(0, 0)
            pause(5)
    #pins.servo_write_pin(AnalogPin.P16, 0)    #position initial
    #pause(2000)
    #pins.servo_write_pin(AnalogPin.P16, 180)    #position gauche
    #pause(2000)
    #pins.servo_write_pin(AnalogPin.P16, 0)    #position droite
    pass
basic.forever(on_forever)

 */
