# Cat (in a) Box

Javascript 2D game engine.



## Progress

* Game Object
  * Variables
    * Active in Hierarchy
    * Active Self
    * Animation
    * Audio
    * Camera
    * Collider
    * Constant Force
    * GUI Text
    * GUI Texture
    * Hinge Joint
    * Is Static?
    * 100% | Layer
    * Light
    * Network View
    * Particle System
    * Renderer
    * Rigidbody
    * 100% | Tag
    * 100% | Transform
  * Constructors
    * Game Object
  * Functions
    * Add Component
    * Broadcast Message
    * Compare Tag
    * Get Component
    * Get Component in Children
    * Get Components
    * Get Components in Children
    * 100% | Send Message
    * Send Message Upwards
    * Set Active
  * Static Functions
    * Create Primitive?
    * Find
    * Find Game Objects with Tag
    * Find with Tag
* Component / Behaviour
  * Variables
    * Enabled
    * Use GUI Layout
    * Animation
    * Audio Source
    * Camera
      * Static Variables
        * All Cameras
        * Current
        * Main
      * Variables
        * Aspect
        * Background Color
        * Camera to World Matrix
        * Clear Flags
        * Culling Mask
        * Depth
        * Event Mask
        * OrthographicSize
        * Pixel Height
        * Pixel Width
        * Projection Matrix
        * Rect
        * Target Texture
        * Transparency Sort Mode
        * Use Occlusion Culling
        * Velocity
        * World to Camera Matrix
      * Functions
        * Copy From
        * Render
        * Render with Shader
        * Reset Aspect
        * Reset Projection Matrix
        * Reset Replacement Shader
        * Reset World to Camera Matrix
        * Screen to Viewport Point
        * Screen to World Point
        * Set Replacement Shader
        * Set Target Buffers
        * Viewport to Screen Point
        * Viewport to World Point
        * World to Screen Point
        * World to Viewport Point
      * Messages
        * On Post Render
        * On Pre Cull
        * On Pre Render
        * On Render Image
        * On Render Object
        * On Will Render Object
    * Collider
      * Variables
        * Attached Rigidbody
        * Bounds
        * Enabled
        * Is Trigger
        * Material (Physic Material)
          * Variables
            * Bounce Combine
            * Bounciness
            * Dynamic Friction
            * Friction Combine
            * Static Friction
          * Constructors
            * Physic Material
      * Functions
        * Closest Point on Bounds
        * Raycast
      * Messages
        * On Collision Enter
        * On Collision Exit
        * On Collision Stay
        * On Trigger Enter
        * On Trigger Exit
        * On Trigger Stay
      * Derivatives
        * Box Collider (AABB when possible)
          * Center
          * Size
        * Circle Collider
          * Center
          * Radius
        * Capsule Collider
          * Center
          * Direction
          * Height
          * Radius
        * Mesh Collider
          * Convex
          * Mesh
          * Smooth Circle Collisions
        * Pixel Collider
          * Update Bounds
    * Constant Force
    * Game Object
    * GUI Text
    * GUI Texture
    * HingeJoint
    * Light
    * Network View
    * Particle System
    * Renderer
      * Variables
        * Bounds
        * Cast Shadows
        * Enabled
        * Is Part of Static Batch
        * Is Visible
        * Local to World Matrix
        * Material
        * Materials
        * Receive Shadows
        * World to Local Matrix
      * Functions
        * Set Property Block
      * Messages
        * On Became Invisible
        * On Became Visible
      * Derivatives
        * Cloth Renderer
          * Pause when not Visible
        * Line Renderer
          * Use World Space
          * Set Colors?
          * Set Position?
          * Set Vertex Count?
          * Set Width?
        * Mesh Renderer
        * Particle System Renderer
          * Camera Velocity Scale
          * Length Scale
          * Max Particle Size
          * Mesh
          * Render Mode
          * Velocity Scale
        * Sprite Renderer
          * Color
          * Sprite
            * Bounds
            * Packed
            * Packing Mode
            * Packing Rotation
            * Rect
            * CreaDte
        * Trail Renderer
          * Autodestruct
          * End Wid[MaDth
          * Start Width
          * Time
    * Rigidbody[Ma
      * Variables
        * Angular Drag
        * Angular Velocity
        * Center of Mass
        * Collision Detection Mode
        * Constraints
        * Detect Collisions
        * Drag
        * Freeze Rotation
        * Inertia Tensor
        * Inertia Tensor Rotation
        * Interpolation
        * Is Kinematic
        * Mass
        * Max Angular Velocity
        * Position
        * Rotation
        * Sleep Angular Velocity
        * Sleep Velocity
        * Solver Iteration Count
        * Use Cone Friction
        * Use Gravity
        * Velocity
        * World Center of Mass
      * Functions
        * Add Explosion Force
        * Add Force
        * Add Force at Position
        * Add Relative Force
        * Add Relative Torque
        * Add Torque
        * Closest Point on Bounds
        * Get Point Velocity
        * Get Relative Point Velocity
        * Is Sleeping
        * Move Position
        * Move Rotation
        * Set Density
        * Sleep
        * Sweep Test
        * Sweet Test All
      * Messages
        * On Collision Enter
        * On Collision Exit
        * On Collision Stay
    * Tag
    * Transform
      * Variables
        * Child Count
        * Has Changed
        * Local Position
        * Local Rotation
        * Local Scale
        * Local to World Matrix
        * Lossy Scale
        * Parent
        * Position
          * Z
        * Right
        * Root
        * Rotation
        * Up
        * World to Local Matrix
      * Functions
        * Detach Children
        * Find
        * GetChild
        * Inverse Transform Direction
        * Inverse Transform Point
        * Is Child Of
        * Transform Direction
        * Transform Point
        * Translate
      * Enumerability
    * Hide Flags
    * Name
  * Functions
    * Cancel Invoke
    * Invoke
    * Invoke Repeating
    * Is Invoking
    * Broadcast Message
    * Compare Tag
    * Get Component
    * Get Component In Children
    * Get Components
    * Get Components In Children
    * Send Message
    * Send Message Upwards
    * Get Instance ID
    * To String
  * Messages
    * Awake
    * Fixed Update
    * Late Update
    * On Application Focus
    * On Application Pause
    * On Application Quit
    * On Audio Filter Read
    * On Became Invisible
    * On Became Visible
    * On Collision Enter
    * On Collision Exit
    * On Collision Stay
    * On Connected to Server
    * On Controller Collider Hit
    * On Destroy
    * On Disable
    * On Disconnected from Server
    * On Enable
    * On Failed to Connect
    * On Failed to Connect to Master Server
    * On GUI
    * On Joint Break
    * On Level was Loaded
    * On Master Server Event
    * On Mouse Down
    * On Mouse Drag
    * On Mouse Enter
    * On Mouse Exit
    * On Mouse Over
    * On Mouse Up
    * On Mouse Up As Button
    * On Network Instantiate
    * On Particle Collision
    * On Player Connected
    * On Player Disconnected
    * On Post Render
    * On Pre Cull
    * On Pre Render
    * On Render Image
    * On Render Object
    * On Serialize Network View
    * On Server Initialized
    * On Trigger Enter
    * On Trigger Exit
    * On Trigger Stay
    * On Will Render Object
    * Reset
    * Start
    * Update
  * Static Functions
    * print
    * Destroy
    * Destroy Immediate
    * Don't Destroy on Load
    * Find Object of Type
    * Find Objects of Type
    * Instantiate
* Physics
  * Static Variables
    * 100% | All Layers
    * 50% | Bounce Threshold
    * 100% | Default Raycast Layers
    * 100% | Gravity
    * 100% | Ignore Raycast Layer
    * 50% | Max Angular Velocity
    * 50% Min Penetration For Penalty
    * 50% Sleep Angular Velocity
    * 50% Sleep Velocity
    * 50% Solver Iteration Count
  * Static Functions
    * Capsule Cast
    * Capsule Cast All
    * Check Capsule
    * Check Circle
    * Get Ignore Layer Collision
    * Ignore Collision
    * Ignore Layer Collision
    * Linecast
    * Overlap Circle
    * Raycast
    * Raycast All
    * Circle Cast
    * Circle Cast All
