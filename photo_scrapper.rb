require 'open-uri'
require 'byebug'

data = [
  {"id": "Jeff Sessions", "img_url": "xxx", "img_url":"http://media.npr.org/assets/img/2017/06/13/sessions-0613_sq-60e9a6a833000a696a83b5536c3d4ad0696971fb-s300-c85.jpg"},
  {"id": "James Mattis", "img_url": "http://c8.nrostatic.com/sites/default/files/uploaded/james-mattis-defense-secretary-perfect-choice-r.jpg"},
  {"id": "Steven Mnuchin", "img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Steven_Mnuchin_official_portrait.jpg/1200px-Steven_Mnuchin_official_portrait.jpg"},
  {"id": "Rex W. Tillerson", "img_url": "http://www.eduinreview.com/blog/wp-content/uploads/2017/02/5Tillerson.jpg"},
  {"id": "Steve Bannon", "img_url": "https://www.google.com/search?q=Stephen+K.+Bannon&source=lnms&tbm=isch&sa=X&ved=0ahUKEwje0ouHuqrWAhVG3SYKHRSwD_8Q_AUIDCgD&biw=1103&bih=776#imgrc=tZmRXTh-nW2A1M:"},
  {"id": "Reince Priebus", "img_url": "https://cdn6-thechristianpost.netdna-ssl.com/full/68224/295-337/img.jpg"},
  {"id": "Jared Kushner", "img_url": "https://www.gannett-cdn.com/-mm-/2009d24507d9265464371233d43b42bf4c3e2885/c=294-0-4890-3456&r=x404&c=534x401/local/-/media/2017/04/03/USATODAY/USATODAY/636267932235307199-EPA-FILE-IRAQ-USA-GOVERNMENT-KUSHNER-89986202.JPG"},
  {"id": "Ryan Zinke", "img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Ryan_Zinke_official_congressional_photo_%28crop%29.jpg/220px-Ryan_Zinke_official_congressional_photo_%28crop%29.jpg"},
  {"id": "Tom Bossert", "img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Thomas-bossert.jpg"},
  {"id": "Kellyanne Conway", "img_url": "https://pixel.nymag.com/imgs/daily/intelligencer/2017/03/17/magazine/17-kellyanne-lede.w710.h473.2x.jpg"},
  {"id": "Carl Icahn", "img_url": "https://specials-images.forbesimg.com/imageserve/57e5739ca7ea430a8a1a2b8f/416x416.jpg?background=000000&cropX1=113&cropX2=730&cropY1=63&cropY2=680"},
  {"id": "Don McGahn", "img_url": "http://dy00k1db5oznd.cloudfront.net/wp-content/uploads/2016/12/GettyImages-131256735_crop-1280x720.jpg"},
  {"id": "Peter Navarro", "img_url": "http://i.investopedia.com/content/article/peter_navarro/peter_navarro_02.jpg"},
  {"id": "Sean Spicer", "img_url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Press_secretary_Sean_Spicer.jpg"},
  {"id": "H.R. McMaster", "img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/H.R._McMaster_ARCIC_2014.jpg/220px-H.R._McMaster_ARCIC_2014.jpg"},
  {"id": "Michael T. Flynn", "img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Michael_T_Flynn.jpg/220px-Michael_T_Flynn.jpg"}
]

data.each do |object|
  path = "./public/mugshots/#{object[:id]}.png"

  open(path, 'wb') do |file|
    file << open(object[:img_url]).read
  end
end

# open('test.png', 'wb') do |file|
#   file << open('http://s3-origin-images.politico.com/2014/02/25/annaheadshot_288.jpg').read
# end
